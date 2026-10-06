# AGENTS.md — jimsonyang.com

Orientation for coding agents. Keep this current when you change the things it describes.

## What ships

- **`index.html`** (repo root) is the live site — the "JimsonOS" desktop-metaphor page,
  hand-written HTML + inline CSS/JS, no framework. Vite passes it through on build.
  Push to `main` → `.github/workflows/deploy.yml` builds `dist/` → GitHub Pages →
  `www.jimsonyang.com`. The React app under `src/` is not the live site (superseded).
- **`projects.jimsonyang.com`** is a *separate* deploy on an Oracle VM, not this repo's
  Pages. Its landing page source lives on the box, not here. See `SERVER-SETUP.md`
  (gitignored). `projects-landing/index.html` in this repo is a stale snapshot.

## Content is edited from the admin panel — read this before changing text

The owner edits site text, app visibility, and wallpapers from **`/admin.html`**
(`public/admin.html`, password-gated) instead of asking for code changes. It writes
**`public/site-content.json`**, which `index.html` fetches on load (`applySiteConfig()`), and
publishes by committing that file through the GitHub API (fine-grained token kept in the
owner's browser) → Pages redeploys.

- **Overrides win.** A `text` / `links` entry in `site-content.json` replaces what's written in
  `index.html`. If you change text in the HTML and it doesn't show up, check that file — and
  when the owner asks for a text change, prefer editing `site-content.json` (or tell them it's
  one click in the admin panel) over editing HTML that an override is hiding.
- **Every editable element carries `data-edit="<region>.<n>"`** (links: `data-edit-href="<region>.linkN"`).
  Regions: `site`, `boot`, `menubar`, `desktop`, `about`, `aventos`, `projects`, `experience`,
  `education`, `contact`. Keys are stored in `site-content.json`, so **never renumber or reuse a
  key** — give new elements a new unused key (e.g. next number in that region). Leaf elements
  only (it sets `textContent`). The admin panel discovers fields by parsing `/index.html`, so a
  new tag shows up there automatically.
- **Apps on/off:** `hiddenApps: ["aventos"]` hides the desktop icon, dock item, Window-menu
  row, the window, and anything tagged `data-needs-app="<app>"`. Use `appOn(key)` in new code.
- **Wallpapers:** catalog is the `<script type="application/json" id="wallpaperCatalog">` block
  in `index.html`; files in `public/wallpapers/` (sources/licenses in `CREDITS.md`).
  `wallpapers: [ids]` picks the rotation (empty = all), `wallpaperMinutes` the interval (default 5).
  Two `.wallpaper` layers crossfade. To add one: drop the file in, add a catalog entry.
- `bootMessages` overrides the boot-screen captions. JS-built text (modals, Get Info) is not
  covered yet.
- `/?preview` renders the admin panel's unpublished draft (localStorage) instead of the live JSON.
- The admin password is stored only as a SHA-256 hash in `admin.html`; it just hides the UI.
  The GitHub token is the real authorisation. Never commit the plaintext password or a token.

## App icon system (Flat Keycaps)

The desktop-rail and dock icons use one system, chosen from a set of directions
(see the "JimsonOS Icon Directions" / "Icon Glyphs" artifact):

- **Container:** matte solid tile + top-light/bottom-shadow bevel. Per-app hue is a
  CSS var `--ic` set by `.g-<app>` classes (`.g-about { --ic: #0072e0 }` …).
  Styling: the combined `.icon-glyph, .dock-item` rule + `.app-g` (the glyph `<svg>`).
- **Glyph:** a white monoline SVG `<symbol>`. All symbols live in one `<svg><defs>`
  block right after `<body>` (`ab-*`, `av-*`, `geo-*`, `pk-*`, `pj-*`, `ex-*`,
  `ed-*`, `ct-*`). The alternates are kept on purpose — they feed the runtime switcher.
- **Which glyph shows:** `renderIcons()` points each `<use>` at `glyphChoice[app]`.
  Order of precedence: `localStorage['jimsonos-icons-v1']` (if valid) → `DEFAULT_GLYPHS`.
- **Runtime switcher:** right-click a desktop icon → **Change Icon…** →
  `openIconPicker(app)` opens a modal of that app's `GLYPH_SETS[app]` candidates;
  clicking one calls `chooseGlyph()` which saves to localStorage and re-renders live.
  "Reset to default" restores `DEFAULT_GLYPHS[app]`.

### Current chosen set (`DEFAULT_GLYPHS`)

| app | glyph id | |
|---|---|---|
| about | `ab-bust` | portrait |
| aventos | `av-cam` | camera |
| geo | `geo-quote` | answer + spark |
| pink | `pk-flask` | flask |
| projects | `pj-terminal` | Projects uses a coding-themed sub-set (`pj-terminal / pj-code / pj-braces / pj-filecode / pj-branch / pj-folder`) |
| experience | `ex-case` | briefcase |
| education | `ed-cap` | grad cap |
| contact | `ct-env` | envelope |

### Adding or changing an app icon

1. Add a `<symbol id="…" viewBox="0 0 24 24">` to the defs block (monoline, ~2px weight,
   no `fill`/`stroke` attrs — `.app-g` sets them).
2. Add its `[id, label]` to `GLYPH_SETS[app]`.
3. If it's the new default, set `DEFAULT_GLYPHS[app]`.
4. New app entirely: also add the `.g-<app> { --ic: … }` colour, an `apps[]` +
   `appMeta[]` entry, and give the rail/dock element `data-app` + the
   `<svg class="app-g"><use href="#…"></use></svg>` scaffold.

The in-window `.file-icon` badges (Projects window, About→Projects tab) are a
separate letter/gradient style and are **not** part of this system yet.

## Other notes

- Education windows show a hand-built Michigan Block M (inline `<svg><polygon>`,
  `.edu-logo`) — no external asset.
- Favicons (`public/favicon*.png|ico`, `apple-touch-icon.png`) are made from the owner's LinkedIn photo.
- Keep the desktop minimal — no instructional copy on the desktop itself (the old "click an icon…" hint was removed on request).
- Right-click behaviour, wallpaper cycling, boot sequence, window drag/resize are all
  in the single `<script>` at the bottom of `index.html`.
- Don't commit `SERVER-SETUP.md` or any key (`.gitignore` covers `*.key`, `*.pem`, etc.).
- Commit to `main` only when asked (solo repo, Pages deploys on push).
