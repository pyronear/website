# CLAUDE.md

Hugo static site for Pyronear (home page plus 5 pages, 4 languages). See README.md for where content lives.

- Serve: `hugo server`. Build: `hugo --gc --minify --panicOnWarning`. No tests or linters.
- Uses current Hugo layout conventions: `layouts/baseof.html`, `layouts/home.html`, `layouts/_partials/`.
- Page copy goes in `content/_index.<lang>.md` (home) and `content/<page>/index.<lang>.md` (Markdown body, structured blocks in front matter), short UI strings in `i18n/`, shared lists in `data/`. Keep all 4 languages in sync.
- Pages with a custom template set `layout:` in front matter (`layouts/<layout>.html`); others use `layouts/page.html`.
- No CSS/JS framework: plain CSS in `assets/css/main.css`, vanilla JS in `assets/js/`. Leaflet is vendored in `static/vendor/leaflet/` and only loaded on the deployments page.
- `assets/js/form.js` must keep the payload shape expected by the Google Apps Script endpoint.
- Markdown images from the page bundle go through `layouts/_markup/render-image.html` (responsive WebP). Raw HTML is disabled in Markdown: use shortcodes in `layouts/_shortcodes/`.
- Keep the `contact-form` anchor on the home page: every page links to it.
