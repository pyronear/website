# Contact form setup

Phase 1 keeps the Hugo website on GitHub Pages. Only the `/contact` API runs on Cloudflare. It uses Managed Turnstile, an empty honeypot, input limits, and a rate limit of 5 attempts per minute per IP before it can send through Resend. The rate limit is approximate and local to each Cloudflare location, not a global daily budget. No CAPTCHA guarantees that all spam will be stopped.

## 1. Mailboxes and Resend

- Create `inquiries@pyronear.org` in Google Workspace as a shared team address with named people responsible for replies. If using a Google Group, allow the authenticated external sender to post and check its Reply-To settings do not override the visitor's address.
- Verify the **`pyronear.org` sending domain** in Resend. Sending from `forms@pyronear.org` requires this domain, rather than only verifying a different subdomain. Route mail arriving at `forms@` to a monitored team mailbox as well; it does not need a separate paid mailbox.
- Create a Resend API key restricted to sending on this domain. Disable open/click tracking for these plain-text notifications. Keep account overages disabled if you want to stay on the free allowance (currently 100 emails/day, 3,000/month).

The Worker fixes these headers server-side:

| Header | Value |
| --- | --- |
| From | `Pyronear website <forms@pyronear.org>` |
| To | `inquiries@pyronear.org` |
| Reply-To | The trimmed, validated visitor email |

The visitor is not used as From and receives no automated copy. This is email format validation, not proof that the visitor owns the address.

### DNS in Cloudflare

Add the exact sending records provided by Resend: DKIM, and its return-path SPF/MX records (normally on `send.pyronear.org`). Keep the domain's existing Google Workspace MX records at `@`; those still receive the team's mail. Enable **sending only**, not Resend inbound email for the root domain. Mail-related CNAME records must be DNS-only.

Public DNS checked on 2026-09-28 already includes:

- Root SPF: `v=spf1 a mx include:_spf.google.com ~all`.
- A Google DKIM key at `google._domainkey` and Brevo DKIM CNAMEs.
- DMARC: `v=DMARC1; p=quarantine`.

Preserve these existing records. Resend's return-path SPF belongs at the hostname it specifies; do not add a second root SPF record or weaken DMARC to `p=none`. Its DKIM signature must align with `pyronear.org` so DMARC passes. DNS records being present does not prove that a received message passes authentication. Check the received message's `Authentication-Results` for SPF, DKIM and DMARC, including aligned DKIM, and test that Reply targets the visitor. Authentication improves delivery but cannot guarantee inbox placement. An optional DMARC `rua` reporting address can be added to the existing policy once someone owns that mailbox.

References: [Resend with Cloudflare DNS](https://resend.com/docs/knowledge-base/cloudflare), [Google sender guidelines](https://support.google.com/mail/answer/81126).

## 2. Turnstile and the Worker

Create a **Managed** Turnstile widget restricted to `website.pyronear.org`. This is the current GitHub Pages custom domain. Add other production hostnames only when the form is actually served there; keep `localhost` and preview domains out of the production widget. Set the same origins in `ALLOWED_ORIGINS` in `wrangler.toml`. Tokens must match both the request origin's hostname and the `contact` action.

From this directory, with Node.js 22 or newer:

```sh
npm ci
npm test
npm run check
npx wrangler login
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put RESEND_API_KEY
npm run deploy
```

Use the Pyronear Cloudflare account. Before deployment, check that rate-limit namespace ID `1001` is unused by other Workers in that account; choose another unused positive integer if needed. The two `secret put` commands prompt for values; never put them in Git, Hugo parameters, or GitHub repository variables. No Google credentials are needed.

The Worker has no website assets and does not change the website's DNS. Use its returned `https://pyronear-contact.<account-subdomain>.workers.dev/contact` endpoint, or configure a dedicated API hostname later. Only POST `/contact` can send mail; unsupported origins, failed verification, missing configuration, and upstream errors fail closed. CORS is an additional browser restriction, not authentication.

## 3. Connect the website

In the GitHub repository's **Settings → Secrets and variables → Actions → Variables**, add:

| Repository variable | Value |
| --- | --- |
| `CONTACT_FORM_URL` | The deployed Worker's HTTPS URL, ending in `/contact` |
| `TURNSTILE_SITE_KEY` | The widget's public production sitekey (`0x…`) |

GitHub Actions passes these as `HUGO_PARAMS_FORMACTION` and `HUGO_PARAMS_TURNSTILESITEKEY`. Both values are public. Production builds reject missing values or test sitekeys so an unfinished setup cannot replace the working website. Deploy the Worker and configure these variables **before** merging the website change. Review builds do not deploy the website or the Worker.

After the new form is live and checked, disable **all old Google Apps Script web deployments** that can send contact mail. Removing the URL from the website does not close that publicly reachable endpoint. Preserve the old Sheet as historical data; it is no longer part of submission handling.

## Validation

- `npm test` uses Node's built-in test runner and mocks both external APIs. It sends no email and checks rejection paths, fixed mail routing, and idempotency keys.
- `npm run check` bundles the Worker without deploying it.
- Build Hugo with `hugo --gc --minify --panicOnWarning`. Check all four languages, keyboard operation, a narrow mobile viewport, an empty/invalid email, and a valid address with a `+tag`.
- In a controlled live check, use a real production token: one valid request should create one email with the headers above. An expired/reused token or a direct request without a token must create none. Confirm delivery and authentication in the actual team mailbox; API acceptance alone is not proof of inbox delivery.
- Simulate an upstream error locally: keep the filled message, show an error, and obtain a fresh token for a manual retry. Unchanged retries retain the same request ID, which Resend deduplicates for 24 hours. Do not automatically retry sends after an ambiguous timeout.
- Watch Cloudflare Worker errors and Resend delivery/bounce logs after rollout. Application logs deliberately exclude visitor addresses, messages, IPs and secrets. No database or background delivery queue is maintained.

For local UI checks, use [Cloudflare's test sitekeys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) and a local mock endpoint via the Hugo environment variables. Keep real Resend credentials out of local UI tests. Any future hosted previews must also use test verification and a backend that cannot send production email.

## Phase 2

A separate decision can move Hugo hosting and PR previews to Cloudflare Workers Static Assets. The contact handler and Resend setup can be reused, with the form then pointing to `/contact` on the same origin. No hosting migration or image-labelling CAPTCHA is part of this change.
