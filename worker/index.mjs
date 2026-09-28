const MAX_BODY_BYTES = 65536;
// HTML email syntax, with a dotted domain for public contact addresses.
const EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function readForm(request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new URLSearchParams(await new Blob(chunks).text());
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(value => value.trim());
    const headers = { "Cache-Control": "no-store", Vary: "Origin" };
    if (origin && allowed.includes(origin)) headers["Access-Control-Allow-Origin"] = origin;
    const reply = (status, error) => Response.json(error ? { error } : { result: "success" }, { status, headers });

    if (!origin || !allowed.includes(origin)) return reply(403, "origin_denied");
    if (new URL(request.url).pathname !== "/contact") return reply(404, "not_found");
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: {
        ...headers, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type",
      } });
    }
    if (request.method !== "POST") return reply(405, "method_not_allowed");
    if (request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/x-www-form-urlencoded") {
      return reply(415, "invalid_input");
    }
    if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.CONTACT_RATE_LIMITER) {
      return reply(503, "unavailable");
    }

    try {
      // ponytail: per-IP limits are local; use a Durable Object if a strict global budget is needed.
      const ip = request.headers.get("CF-Connecting-IP");
      if (!ip) return reply(503, "unavailable");
      if (!(await env.CONTACT_RATE_LIMITER.limit({ key: ip })).success) {
        headers["Retry-After"] = "60";
        return reply(429, "rate_limited");
      }
      const form = await readForm(request);
      if (!form) return reply(413, "invalid_input");
      const fields = ["email", "subject", "message", "honeypot", "cf-turnstile-response", "requestId"];
      if (fields.some(name => form.getAll(name).length > 1)) return reply(400, "invalid_input");
      if (form.get("honeypot")) return reply(400, "invalid_input");
      const email = (form.get("email") || "").trim();
      const subject = (form.get("subject") || "").trim();
      const message = (form.get("message") || "").trim();
      const token = form.get("cf-turnstile-response") || "";
      const requestId = form.get("requestId") || "";
      if (email.length > 254 || !EMAIL.test(email) || subject.length > 200 || /[\r\n\x00]/.test(subject) ||
          !message || message.length > 5000 || !UUID.test(requestId)) {
        return reply(400, "invalid_input");
      }
      if (!token || token.length > 2048) return reply(403, "captcha_failed");

      let verified;
      try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) return reply(503, "unavailable");
        verified = await response.json();
      } catch {
        return reply(503, "unavailable");
      }
      if (verified.success !== true || verified.hostname !== new URL(origin).hostname || verified.action !== "contact") {
        return reply(403, "captcha_failed");
      }

      // The recipient and sender are never taken from submitted fields.
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `contact/${requestId}`,
        },
        body: JSON.stringify({
          from: "Pyronear website <forms@pyronear.org>",
          to: ["inquiries@pyronear.org"],
          reply_to: email,
          subject: `[Contact form] ${subject || "Website contact"}`,
          text: message,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const result = await response.json();
      if (!response.ok || !result.id) {
        console.error("Contact email rejected", response.status);
        return reply(502, "send_failed");
      }
      return reply(200);
    } catch {
      // Do not log message contents, email addresses, IPs, tokens, or provider responses.
      console.error("Contact request failed");
      return reply(502, "send_failed");
    }
  },
};
