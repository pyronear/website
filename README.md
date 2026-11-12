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
| Other pages (About, How it works, Deployments, Support us, News) | `content/<page>/index.<lang>.md` |
| Buttons, form labels, short UI text | `i18n/<lang>.yaml` (`i18n/ca.yaml` for Catalan) |
| Key figures (home and About) | `data/figures.yaml` |
| Deployments map: shaded departments and countries | `data/deployments.yaml` |
| Outlines of the French departments (generated, do not edit by hand) | `data/france_departments.json` |
| Partners | `data/partners.yaml` |
| Supporters | `data/sponsors.yaml` |
| News items | `data/news.yaml` |
| Site settings, languages, social links | `hugo.toml` |
| Website / contact Worker settings | `wrangler.toml` / `worker/wrangler.toml` |
| Templates | `layouts/` |
| Styles and scripts | `assets/css/main.css`, `assets/js/` |
| Images | `static/img/`; photos used in a page's Markdown go next to it in `content/<page>/` (the hero photo is in `assets/img/`) |
| Default social share image | `static/img/og.jpg` |

Each page's URL is set by `slug` in its front matter. Shared menu order, templates and resource settings live in the `cascade` entries in `hugo.toml` and apply to every translation.

Languages: French (default, served at `/`), English (`/en/`), Spanish (`/es/`) and Catalan (`/es-ct/`).

### Ordering

- News items: newest first, every item dated. All items are listed on the News page. Add `featured: true` (with an `image`) to show an item on the home page and at the top of the News page (keep it to 3). Quote dates (`date: "09.2025"`).
- Partners and supporters: newest last. Add `home: true` to a supporter to also show its logo in the partners strip of the home page.

### Images and embeds in pages

- Put photos in the page folder (for example `content/how-it-works/`) and reference them by file name: `![Alt text](photo.jpg)`. They are converted to WebP at several sizes. Strip location metadata (GPS) before adding a photo.
- `{{< gallery >}} ... {{< /gallery >}}` shows the images inside as a grid.
- `{{< youtube id="VIDEO_ID" title="..." loading="lazy" >}}` embeds a video from youtube-nocookie.com.
- `{{< hf-space "owner/name" "https://owner-name.hf.space" >}}` embeds a Hugging Face demo that only loads when opened.
- A page's share image can be set with `images: [photo.jpg]` in its front matter.

### Deployment map

The Deployments page shows a static map of France with the departments where at least one camera runs, next to key figures and the list of countries. Everything comes from `data/deployments.yaml`:

- An entry with `dept` (the department code, in quotes: `"07"`, `"2A"`) shades that department. `name` is optional and shows when hovering the department.
- An entry without `dept` is a country: it is added to the list of countries.
- The number of departments and the number of countries on the page are counted from these entries. The "countries" figure of the home and About pages is separate: update it in `data/figures.yaml`.

```yaml
- name: SDIS 07
  dept: "07"
  lat: 44.73
  lng: 4.60
  place: { fr: Ardèche, en: Ardèche, es: Ardèche, es-ct: Ardèche }
```

Keep `lat` and `lng` approximate (department or region level), never the exact position of a station.

The department outlines in `data/france_departments.json` are simplified from IGN open data (Admin Express, Licence Ouverte 2.0).

### Adding a partner or supporter

Add an entry to `data/partners.yaml` or `data/sponsors.yaml` with a `description` in every language. For a partner, keep it to one short line saying who they are (for example "Service d'incendie et de secours de l'Ardèche"):

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

Put the logo in `static/img/` (about 400 px wide is enough) rather than linking to an external image, which breaks when the other site changes.

If the partner brings a new department or country, also add it to `data/deployments.yaml` (see "Deployment map") so the map, its hover label and the figures follow.

## Deployment

Cloudflare Workers Builds connects `pyronear/website` to `pyronear-website` in the **Pyronear** account and runs all tests, builds, previews and deployments from Git events.

| Git branch | Result | Deploy command |
| --- | --- | --- |
| `main` | Deploy the website at `https://website.pyronear.org/` | `npx --yes wrangler@4.157.0 deploy` |
| All other branches | Update a separate Preview; Cloudflare adds its URL to the pull request | `npx --yes wrangler@4.157.0 preview` |

The website's Production and Previews Base build settings use the repository root, `HUGO_VERSION=0.166.0`, `NODE_VERSION=22.23.4`, and build command `node --test worker/index.test.mjs && npx --yes wrangler@4.157.0 deploy --dry-run --config worker/wrangler.toml && hugo --gc --minify --panicOnWarning`. Enable Previews and include all paths. Previews follow branches pushed to this repository; for a fork pull request, push a reviewed copy of its branch here.

The production build also needs `HUGO_PARAMS_FORMACTION` (the contact Worker's HTTPS `/contact` URL) and `HUGO_PARAMS_TURNSTILESITEKEY` (the production widget's public sitekey). Leave these unset in Previews Base: previews show the website with an unavailable contact form and cannot send real mail. Deployment credentials stay in Cloudflare Builds, and mail secrets stay in the contact Worker.

The separate `pyronear-contact` Worker connects to the same repository with production branch `main`, root directory `worker`, build command `node --test index.test.mjs`, deploy command `npx --yes wrangler@4.157.0 deploy`, and Previews disabled. Both Workers deploy on each push to `main`.

The custom domain is declared in `wrangler.toml`. Before changing domains, update `hugo.toml`, the website route, the contact Worker's allowed origins, and the Turnstile widget hostnames. The contact Worker already allows both `website.pyronear.org` and `pyronear.org`.

## Contact form

The form uses Managed Cloudflare Turnstile and the Worker in `worker/` to validate requests before sending through Resend. Browser email validation is native HTML; CAPTCHA rendering, expiry and challenge retries are handled by Turnstile. The Worker also validates fields, checks the token's hostname and `contact` action, and limits attempts to 5/minute/IP (per Cloudflare location).

Mail goes from `forms@pyronear.org` to `inquiries@pyronear.org`, with the visitor in `Reply-To`, `[Contact form]` before the subject, and only the message in the body. Keep the recipient as a shared team inbox with clear reply ownership. For a Google Group, allow the external sender and preserve the visitor's Reply-To. No automated copy goes to the visitor and no spreadsheet entries are created.

1. Verify `pyronear.org` in Resend and create a sending key restricted to that domain. Add its exact DKIM and return-path DNS records in Cloudflare; Pyronear uses `resend._domainkey` (TXT) and `rsend`/`send` (DNS-only CNAMEs). Preserve Google's root MX/SPF records and the existing DMARC policy. Never add a second SPF record at the same hostname. Check SPF, aligned DKIM and DMARC in a received message; authentication cannot guarantee inbox placement. Disable open/click tracking for these notifications.
2. Create a Managed Turnstile widget with both `website.pyronear.org` and `pyronear.org` in its hostname allowlist before deployment. Keep it aligned with `ALLOWED_ORIGINS` in `worker/wrangler.toml`. Production widgets should exclude localhost and preview domains; the existing local test widget is separate. Check the rate-limit namespace ID is unused by other Workers in the account.
3. From `worker/`, check and deploy using the Pyronear Cloudflare account:

```sh
node --test index.test.mjs
npx --yes wrangler@4.157.0 deploy --dry-run
npx wrangler@4.157.0 login
npx wrangler@4.157.0 secret put TURNSTILE_SECRET_KEY
npx wrangler@4.157.0 secret put RESEND_API_KEY
npx wrangler@4.157.0 deploy
```

4. Set the production Cloudflare build variables described above. Keys named `*_SECRET_KEY` and `RESEND_API_KEY` belong only in Worker secrets, never in the website or Git. Local/preview builds without public form configuration show an unavailable form.
5. Test a real submission, delivery, Reply-To and token replay rejection before cutover. Then disable all old Google Apps Script web deployments that can send contact mail; removing their URL does not close them. Preserve the old Sheet as history.

Failed submissions preserve the form and require a fresh CAPTCHA token. Unchanged manual retries reuse the Resend idempotency key to avoid duplicate emails after timeouts. Application logs exclude visitor addresses, messages, IPs and secrets. Tests mock the external services and send no email.

For a manual local test with real mail, use a separate real widget restricted to `127.0.0.1`. Store credentials in the ignored `worker/.dev.vars` file (permissions `600`) with `ALLOWED_ORIGINS="http://127.0.0.1:14137"`. From `worker/`, run `npx wrangler@4.157.0 dev --local --ip 127.0.0.1 --port 14138 --inspector-port 14139`; restart after credential changes. From the repository root, set `HUGO_PARAMS_FORMACTION=http://127.0.0.1:14138/contact` and `HUGO_PARAMS_TURNSTILESITEKEY` to the public sitekey, then run:

```sh
hugo server --bind 127.0.0.1 --port 14137 --baseURL http://127.0.0.1:14137 --disableFastRender
```

Open `http://127.0.0.1:14137/#contact-form` in a regular browser. Automated UI tests should use [Turnstile test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) and a mock mail endpoint.
