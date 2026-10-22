# Pyronear website

Pyronear's official website, built with [Hugo](https://gohugo.io/) (extended, v0.166 or newer).

## Run locally

```shell
brew install hugo   # or see https://gohugo.io/installation/
hugo server
```

Then open http://localhost:1313. Build the static site into `public/` with:

```shell
hugo --gc --minify
```

## Where things live

| What | File |
| --- | --- |
| Home page copy (hero, intro, contact form, footer) | `content/_index.<lang>.md` |
| Other pages (About, How it works, Deployments, Support us, Press) | `content/<page>/index.<lang>.md` |
| Buttons, form labels, short UI text | `i18n/<lang>.yaml` |
| Key figures (home and About) | `data/figures.yaml` |
| Deployment map markers | `data/deployments.yaml` |
| Partners | `data/partners.yaml` |
| Supporters | `data/sponsors.yaml` |
| Press items | `data/medias.yaml` |
| Site settings, languages, social links | `hugo.toml` |
| Templates | `layouts/` |
| Styles and scripts | `assets/css/main.css`, `assets/js/` |
| Images | `static/img/`; photos used in a page's Markdown go next to it in `content/<page>/` (the hero photo is in `assets/img/`) |
| Default social share image | `static/img/og.jpg` |
| Leaflet (map library) | `static/vendor/leaflet/` |

Each page's URL is set by `slug` in its front matter, and its place in the menu by `menus.main.weight`.

Languages: French (default, served at `/`), English (`/en/`), Spanish (`/es/`) and Catalan (`/es-ct/`).

### Ordering

- Press items: newest first. Items with an `image` are shown as cards, the others in the list below. Add `featured: true` to show an item on the home page (keep it to 3). Quote dates (`date: "09.2025"`).
- Partners and supporters: newest last.

### Images and embeds in pages

- Put photos in the page folder (for example `content/how-it-works/`) and reference them by file name: `![Alt text](photo.jpg)`. They are converted to WebP at several sizes. Strip location metadata (GPS) before adding a photo.
- `{{< gallery >}} ... {{< /gallery >}}` shows the images inside as a grid.
- `{{< youtube id="VIDEO_ID" title="..." loading="lazy" >}}` embeds a video from youtube-nocookie.com.
- `{{< hf-space "owner/name" "https://owner-name.hf.space" >}}` embeds a Hugging Face demo that only loads when opened.
- A page's share image can be set with `images: [photo.jpg]` in its front matter.

### Deployment map

Each entry in `data/deployments.yaml` is one marker. Use approximate coordinates (department or region level), never the exact position of a station.

### Adding a partner or supporter

Add an entry to `data/partners.yaml` or `data/sponsors.yaml` with a `description` in every language:

```yaml
- name: Example
  url: https://example.org/
  logo: /img/example.png
  description:
    fr: ...
    en: ...
    es: ...
    es-ct: ...
```

Prefer putting the logo in `static/img/` over linking to an external image.

## Deployment

`.github/workflows/deploy.yml` builds the site on every pull request and deploys it to GitHub Pages on every push to `main` (or when run manually from the Actions tab). The repository's Pages source must be set to "GitHub Actions". The site URL comes from the repository's Pages settings (custom domain `website.pyronear.org` for now). Before changing domains, allow the new origin in `worker/wrangler.toml`, redeploy the Worker, and add the hostname to the Turnstile widget. The Worker configuration already allows both `website.pyronear.org` and `pyronear.org`.

## Contact form

The form uses Managed Cloudflare Turnstile and the Worker in `worker/` to validate requests before sending through Resend. Browser email validation is native HTML; CAPTCHA rendering, expiry and challenge retries are handled by Turnstile. The Worker also validates fields, checks the token's hostname and `contact` action, and limits attempts to 5/minute/IP (per Cloudflare location).

Mail goes from `forms@pyronear.org` to `inquiries@pyronear.org`, with the visitor in `Reply-To`, `[Contact form]` before the subject, and only the message in the body. Keep the recipient as a shared team inbox with clear reply ownership. For a Google Group, allow the external sender and preserve the visitor's Reply-To. No automated copy goes to the visitor and no spreadsheet entries are created.

1. Verify `pyronear.org` in Resend and create a sending key restricted to that domain. Add its exact DKIM and return-path DNS records in Cloudflare; Pyronear uses `resend._domainkey` (TXT) and `rsend`/`send` (DNS-only CNAMEs). Preserve Google's root MX/SPF records and the existing DMARC policy. Never add a second SPF record at the same hostname. Check SPF, aligned DKIM and DMARC in a received message; authentication cannot guarantee inbox placement. Disable open/click tracking for these notifications.
2. Create a Managed Turnstile widget with both `website.pyronear.org` and `pyronear.org` in its hostname allowlist before deployment. Keep it aligned with `ALLOWED_ORIGINS` in `worker/wrangler.toml`. Production widgets should exclude localhost and preview domains; the existing local test widget is separate. Check the rate-limit namespace ID is unused by other Workers in the account.
3. From `worker/`, check and deploy using the Pyronear Cloudflare account:

```sh
node --test index.test.mjs
npx --yes wrangler@4.143.0 deploy --dry-run
npx wrangler@4.143.0 login
npx wrangler@4.143.0 secret put TURNSTILE_SECRET_KEY
npx wrangler@4.143.0 secret put RESEND_API_KEY
npx wrangler@4.143.0 deploy
```

4. Set GitHub Actions repository variables `CONTACT_FORM_URL` to the deployed HTTPS `/contact` URL and `TURNSTILE_SITE_KEY` to the public production sitekey. GitHub Pages deployment stops if either is missing. Keys named `*_SECRET_KEY` and `RESEND_API_KEY` belong only in Worker secrets, never in the website or Git. Local/PR builds without public form configuration show an unavailable form.
5. Test a real submission, delivery, Reply-To and token replay rejection before cutover. Then disable all old Google Apps Script web deployments that can send contact mail; removing their URL does not close them. Preserve the old Sheet as history.

Failed submissions preserve the form and require a fresh CAPTCHA token. Unchanged manual retries reuse the Resend idempotency key to avoid duplicate emails after timeouts. Application logs exclude visitor addresses, messages, IPs and secrets. Tests mock the external services and send no email.

For a manual local test with real mail, use a separate real widget restricted to `127.0.0.1`. Store credentials in the ignored `worker/.dev.vars` file (permissions `600`) with `ALLOWED_ORIGINS="http://127.0.0.1:14137"`. From `worker/`, run `npx wrangler@4.143.0 dev --local --ip 127.0.0.1 --port 14138 --inspector-port 14139`; restart after credential changes. From the repository root, set `HUGO_PARAMS_FORMACTION=http://127.0.0.1:14138/contact` and `HUGO_PARAMS_TURNSTILESITEKEY` to the public sitekey, then run:

```sh
hugo server --bind 127.0.0.1 --port 14137 --baseURL http://127.0.0.1:14137 --disableFastRender
```

Open `http://127.0.0.1:14137/#contact-form` in a regular browser. Automated/preview UI tests should use [Turnstile test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) and a mock mail endpoint. GitHub Pages still hosts the website; a later Cloudflare hosting migration can reuse the Worker.
