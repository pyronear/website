const MAX_BODY_BYTES = 65536;
// HTML email syntax, with a dotted domain for public contact addresses.
const EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RETRY_WINDOW_MS = 24 * 60 * 60 * 1000;

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

export class ContactDelivery {
  constructor(state, env) {
    this.state = state;
    this.email = env.CONTACT_EMAIL;
  }

  async fetch(request) {
    const payload = await request.text();
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
    const fingerprint = btoa(String.fromCharCode(...new Uint8Array(digest)));
    if (!this.pending) {
      this.pending = this.send(payload, fingerprint).catch(() => null).finally(() => { this.pending = undefined; });
      this.state.waitUntil(this.pending);
    }
    const sent = await this.pending;
    if (!sent) return new Response(null, { status: 502 });
    return new Response(null, { status: sent === fingerprint ? 204 : 409 });
  }

  async send(payload, fingerprint) {
    const { storage } = this.state;
    const sent = await storage.get("sent");
    if (sent) return sent;
    await storage.setAlarm(Date.now() + RETRY_WINDOW_MS);
    try {
      const result = await this.email.send(JSON.parse(payload));
      if (!result.messageId) return null;
    } catch (error) {
      const code = error?.code;
      if (typeof code === "string" && /^E_[A-Z_]{1,48}$/.test(code)) {
        console.error("Contact email send failed", code);
      }
      return null;
    }
    // Store only the fingerprint after the provider confirms acceptance.
    await storage.put("sent", fingerprint);
    return fingerprint;
  }

  async alarm() {
    await this.state.storage.deleteAll();
  }
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
    if (request.method !== "POST") return reply(405, "method_not_allowed");
    if (request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/x-www-form-urlencoded") {
      return reply(415, "invalid_input");
    }
    if (!env.TURNSTILE_SECRET_KEY || !env.CONTACT_EMAIL || !env.CONTACT_DELIVERY || !env.CONTACT_RATE_LIMITER) {
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
      const message = (form.get("message") || "").replace(/\r\n/g, "\n").trim();
      const token = form.get("cf-turnstile-response") || "";
      const requestId = form.get("requestId") || "";
      if (email.length > 254 || !EMAIL.test(email) || subject.length > 200 || /[\r\n\x00]/.test(subject) ||
          !message || message.length > 5000 || !UUID.test(requestId)) {
        return reply(400, "invalid_input");
      }
      if (!token || token.length > 2048) return reply(403, "captcha_failed");

      const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip }),
        signal: AbortSignal.timeout(8000),
      });
      if (!verification.ok) throw new Error("Verification unavailable");
      const verified = await verification.json();
      if (verified.success !== true || verified.hostname !== new URL(origin).hostname || verified.action !== "contact") {
        return reply(403, "captcha_failed");
      }

      // The recipient and sender are never taken from submitted fields.
      const response = await env.CONTACT_DELIVERY.getByName(requestId).fetch("https://contact-delivery.internal/", {
        method: "POST",
        body: JSON.stringify({
          from: { name: "Pyronear website", email: "forms@pyronear.org" },
          to: "inquiries@pyronear.org",
          replyTo: email,
          subject: `[Contact form] ${subject || "Website contact"}`,
          text: message,
        }),
      });
      if (!response.ok) throw new Error("Email rejected");
      return reply(200);
    } catch {
      // Do not log message contents, email addresses, IPs, tokens, or provider responses.
      console.error("Contact request failed");
      return reply(502, "send_failed");
    }
  },
};
