import assert from "node:assert/strict";
import { mock, test, afterEach } from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import worker from "./index.mjs";

const origin = "https://website.pyronear.org";
const valid = {
  email: "visitor+contact@example.org", subject: "Bonjour", message: "Un message 🌲",
  honeypot: "", "cf-turnstile-response": "fresh-token",
  requestId: "fa418393-75df-4ee4-a643-4a5694897c74",
};
const env = {
  ALLOWED_ORIGINS: origin, TURNSTILE_SECRET_KEY: "secret", RESEND_API_KEY: "secret",
  CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
};
function request(fields = {}, options = {}) {
  return new Request("https://contact.example/contact", {
    method: "POST", headers: { Origin: origin, "CF-Connecting-IP": "192.0.2.1" },
    body: new URLSearchParams({ ...valid, ...fields }), ...options,
  });
}
const verified = { success: true, hostname: "website.pyronear.org", action: "contact" };
afterEach(() => mock.restoreAll());

test("verified request sends plain text with fixed routing and a retry key", async () => {
  const calls = [];
  mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url, options });
    return Response.json(calls.length === 1 ? verified : { id: "email-id" });
  });
  const response = await worker.fetch(request({
    to: "attacker@example.org", from: "fake@example.org", bcc: "hidden@example.org", cc: "copy@example.org",
  }), env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: "success" });
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), origin);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal(calls[0].url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
  assert.equal(calls[0].options.body.get("response"), valid["cf-turnstile-response"]);
  assert.equal(calls[0].options.body.get("remoteip"), "192.0.2.1");
  assert.equal(calls[1].url, "https://api.resend.com/emails");
  assert.equal(calls[1].options.headers["Idempotency-Key"], `contact/${valid.requestId}`);
  assert.deepEqual(JSON.parse(calls[1].options.body), {
    from: "Pyronear website <forms@pyronear.org>", to: ["inquiries@pyronear.org"],
    reply_to: valid.email, subject: "[Contact form] Bonjour", text: valid.message,
  });
});

test("invalid inputs and absent challenges never reach external services", async () => {
  const network = mock.method(globalThis, "fetch", () => { throw new Error("unexpected network"); });
  for (const fields of [
    { email: "" }, { email: "invalid" }, { email: "name@localhost" },
    { email: "name@example..org" }, { email: "a@example.org,b@example.org" },
    { email: "a@example.org\r\nBcc: b@example.org" }, { email: "a".repeat(255) + "@example.org" },
    { subject: "hello\r\nBcc: attacker@example.org" }, { subject: "a".repeat(201) },
    { message: "   " }, { message: "a".repeat(5001) }, { requestId: "not-a-uuid" },
    { honeypot: "filled" }, { "cf-turnstile-response": "" }, { "cf-turnstile-response": "a".repeat(2049) },
  ]) {
    const response = await worker.fetch(request(fields), env);
    assert.ok([400, 403].includes(response.status), JSON.stringify(fields).slice(0, 100));
  }
  const duplicate = new URLSearchParams(valid);
  duplicate.append("email", "second@example.org");
  assert.equal((await worker.fetch(request({}, { body: duplicate }), env)).status, 400);
  assert.equal(network.mock.callCount(), 0);
});

test("untrusted origins, methods and body types cannot send", async () => {
  const network = mock.method(globalThis, "fetch", () => { throw new Error("unexpected network"); });
  for (const source of ["https://evil.example", "https://website.pyronear.org.evil.example", "null", ""]) {
    const response = await worker.fetch(request({}, { headers: { Origin: source } }), env);
    assert.equal(response.status, 403);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
  }
  for (const method of ["GET", "OPTIONS"]) {
    assert.equal((await worker.fetch(request({}, { method, body: undefined }), env)).status, 405);
  }
  assert.equal((await worker.fetch(request({}, { body: "invalid" }), env)).status, 415);
  assert.equal(network.mock.callCount(), 0);
});

test("oversized streamed bodies are stopped even without Content-Length", async () => {
  let cancelled = false;
  const body = new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(65537)); },
    cancel() { cancelled = true; },
  });
  const response = await worker.fetch(request({}, {
    headers: { Origin: origin, "CF-Connecting-IP": "192.0.2.1", "Content-Type": "application/x-www-form-urlencoded" },
    body, duplex: "half",
  }), env);
  assert.equal(response.status, 413);
  assert.equal(cancelled, true);
});

test("rate limits and missing configuration fail closed", async () => {
  const network = mock.method(globalThis, "fetch", () => { throw new Error("unexpected network"); });
  const response = await worker.fetch(request(), {
    ...env, CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) },
  });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "60");
  for (const key of ["TURNSTILE_SECRET_KEY", "RESEND_API_KEY", "CONTACT_RATE_LIMITER"]) {
    assert.equal((await worker.fetch(request(), { ...env, [key]: undefined })).status, 503);
  }
  assert.equal(network.mock.callCount(), 0);
});

test("failed, expired, reused and mismatched Turnstile tokens cannot send", async () => {
  for (const result of [
    { ...verified, success: false, "error-codes": ["timeout-or-duplicate"] },
    { ...verified, success: "true" }, { ...verified, hostname: "evil.example" },
    { ...verified, action: "login" }, {},
  ]) {
    const network = mock.method(globalThis, "fetch", async () => Response.json(result));
    assert.equal((await worker.fetch(request(), env)).status, 403);
    assert.equal(network.mock.callCount(), 1);
    mock.restoreAll();
  }
});

test("verification outages never fall through to sending", async () => {
  for (const verify of [
    () => { throw new Error("timeout"); },
    () => new Response("bad gateway", { status: 502 }),
    () => new Response("invalid JSON"),
  ]) {
    mock.method(console, "error", () => {});
    const network = mock.method(globalThis, "fetch", verify);
    assert.equal((await worker.fetch(request(), env)).status, 502);
    assert.equal(network.mock.callCount(), 1);
    mock.restoreAll();
  }
});

test("provider failure never reports success; retry preserves the mail identity", async () => {
  const keys = [];
  let fail = true;
  mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async (url, options) => {
    if (url.includes("siteverify")) return Response.json(verified);
    keys.push(options.headers["Idempotency-Key"]);
    return fail ? Response.json({ message: "quota reached" }, { status: 429 }) : Response.json({ id: "accepted" });
  });
  assert.equal((await worker.fetch(request(), env)).status, 502);
  fail = false;
  assert.equal((await worker.fetch(request({ "cf-turnstile-response": "new-token" }), env)).status, 200);
  assert.equal(keys[0], keys[1]);
});

test("form submission validates, preserves failed messages and deduplicates retries", async () => {
  const controls = Object.fromEntries([".form__error", ".form__note", ".form__thanks", "button", ".cf-turnstile"]
    .map(selector => [selector, { hidden: true, disabled: true, textContent: "Submit" }]));
  const values = { ...valid, "cf-turnstile-response": "" };
  const bodies = [];
  let submit, formValid = false, fail = true, resets = 0, removed = false;
  const form = {
    action: "http://local.test/contact",
    dataset: { captchaError: "captcha", inputError: "input", sendError: "send", sending: "sending" },
    querySelector: selector => controls[selector],
    reportValidity: () => formValid,
    reset: () => { values.message = ""; },
    addEventListener: (_, handler) => { submit = handler; },
  };
  runInNewContext(readFileSync(new URL("../assets/js/form.js", import.meta.url), "utf8"), {
    document: { querySelectorAll: () => [form] },
    FormData: class extends Map { constructor() { super(Object.entries(values)); } },
    URLSearchParams, AbortSignal, crypto,
    window: { turnstile: {
      reset: () => { resets++; values["cf-turnstile-response"] = ""; },
      remove: () => { removed = true; },
    } },
    fetch: async (_, options) => {
      bodies.push(new URLSearchParams(options.body));
      return fail ? Response.json({ error: "send_failed" }, { status: 502 }) : Response.json({ result: "success" });
    },
  });
  const event = { preventDefault() {} };
  await submit(event);
  assert.equal(bodies.length, 0, "invalid fields cannot send");
  formValid = true;
  await submit(event);
  assert.equal(bodies.length, 0, "missing or expired challenge cannot send");
  assert.equal(controls[".form__error"].textContent, "captcha");
  values.message = "   ";
  await submit(event);
  assert.equal(controls[".form__error"].textContent, "input");
  assert.equal(bodies.length, 0, "whitespace-only messages cannot send");
  values.message = valid.message;
  values["cf-turnstile-response"] = "fresh-token";
  await submit(event);
  assert.equal(values.message, valid.message, "failed sends preserve the message");
  assert.equal(controls[".form__error"].textContent, "send");
  assert.equal(resets, 1);
  values["cf-turnstile-response"] = "retry-token";
  await submit(event);
  assert.equal(bodies[0].get("requestId"), bodies[1].get("requestId"));
  values.message = "Edited message";
  values["cf-turnstile-response"] = "another-token";
  fail = false;
  await submit(event);
  assert.notEqual(bodies[1].get("requestId"), bodies[2].get("requestId"));
  assert.equal(bodies[2].get("cf-turnstile-response"), "another-token");
  assert.equal(controls[".form__thanks"].hidden, false);
  assert.equal(controls.button.disabled, true, "successful submission cannot be repeated");
  assert.equal(removed, true);
});
