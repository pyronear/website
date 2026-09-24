# CLAUDE.md

Hugo static site for Pyronear (one page, 4 languages). See README.md for where content lives.

- Serve: `hugo server`. Build: `hugo --gc --minify --panicOnWarning`. No tests or linters.
- Uses current Hugo layout conventions: `layouts/baseof.html`, `layouts/home.html`, `layouts/_partials/`.
- Page copy goes in `content/_index.<lang>.md` front matter, short UI strings in `i18n/`, shared lists in `data/`. Keep all 4 languages in sync.
- No CSS/JS framework: plain CSS in `assets/css/main.css`, vanilla JS in `assets/js/form.js`.
- `assets/js/form.js` must keep the payload shape expected by the Google Apps Script endpoint.
- Keep existing section anchor IDs (`about`, `services`, `opendata`, `partners`, `sponsors`, `media`, `contact-form`, `contact`).
