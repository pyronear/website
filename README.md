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
| Site settings, languages, social links, form endpoint | `hugo.toml` |
| Templates | `layouts/` |
| Styles and scripts | `assets/css/main.css`, `assets/js/` |
| Images | `static/img/`; photos used in a page's Markdown go next to it in `content/<page>/` (the hero photo is in `assets/img/`) |
| Default social share image | `static/img/og.jpg` |
| Leaflet (map library) | `static/vendor/leaflet/` |

Each page's URL is set by `slug` in its front matter, and its place in the menu by `menus.main.weight`.

Languages: French (default, served at `/`), English (`/en/`), Spanish (`/es/`) and Catalan (`/es-ct/`).

### Ordering

- Press items: newest first. Items with an `image` are shown as cards (the 3 first ones also on the home page), the others in the list below. Quote dates (`date: "09.2025"`).
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

`.github/workflows/deploy.yml` builds the site on every pull request and deploys it to GitHub Pages on every push to `main` (or when run manually from the Actions tab). The repository's Pages source must be set to "GitHub Actions". The site URL comes from the repository's Pages settings (custom domain `website.pyronear.org` for now), so changing the domain needs no code change.

## Contact form

The form posts to a Google Apps Script (URL in `hugo.toml`) that stores messages in a Google Sheet and sends an email. The sheet and script are in Pyronear's Google Drive.
