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
| Page copy per language (hero, sections, cards) | `content/_index.<lang>.md` |
| Buttons, form labels, 404 text | `i18n/<lang>.yaml` |
| Partners | `data/partners.yaml` |
| Supporters | `data/sponsors.yaml` |
| Press items (only the first 4 are shown) | `data/medias.yaml` |
| Site settings, languages, social links, form endpoint | `hugo.toml` |
| Templates | `layouts/` |
| Styles and scripts | `assets/css/main.css`, `assets/js/form.js` |
| Images | `static/img/` (the hero photo is in `assets/img/`) |

Languages: French (default, served at `/`), English (`/en/`), Spanish (`/es/`) and Catalan (`/es-ct/`).

### Ordering

- Press items: newest first.
- Partners and supporters: newest last.

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

## Contact form

The form posts to a Google Apps Script (URL in `hugo.toml`) that stores messages in a Google Sheet and sends an email. The sheet and script are in Pyronear's Google Drive.
