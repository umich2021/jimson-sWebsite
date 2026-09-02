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
- Right-click behaviour, wallpaper cycling, boot sequence, window drag/resize are all
  in the single `<script>` at the bottom of `index.html`.
- Don't commit `SERVER-SETUP.md` or any key (`.gitignore` covers `*.key`, `*.pem`, etc.).
- Commit to `main` only when asked (solo repo, Pages deploys on push).
