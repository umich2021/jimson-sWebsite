# jimson-sWebsite

Jimson Yang's personal site — a React + Vite single-page site with a home page and a set of "job lens" variants (`/jobs/:variant`, e.g. Engineering, GTM/Growth, Generalist) that reframe the same experience/projects content for different audiences.

Live at [umich2021.github.io/jimson-sWebsite](https://umich2021.github.io/jimson-sWebsite/).

## Stack

- React 18 + React Router
- Vite (dev server, build, preview)
- Plain CSS (`src/styles`, per-component `.css` files)

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

Or just run `./run.sh`, which installs dependencies if needed and starts the dev server.

## Project structure

```
src/
  content/     data for profile, experience, projects, education, and the job-variant copy
  components/  NavBar, Footer, ProjectCard, ExperienceItem, VideoEmbed
  pages/       Home, JobsHub, JobVariant, NotFound
mockups/       standalone HTML/CSS/JS design explorations (source copy, not built by Vite)
public/mockups/  the same mockups, published — Vite copies public/ into dist/ verbatim, so
                  these ARE live at /jimson-sWebsite/mockups/ on the deployed site
```

## Mockups

`mockups/` holds self-contained HTML prototypes used to explore design directions before (or instead of) building them into the React app — see `mockups/index.html` for the current set. `public/mockups/` mirrors whichever mockup has been settled on (currently just `06-desktop-os.html` and its `index.html`/`archive`), since anything under `public/` is copied straight into the deployed build. In-progress exploration files (e.g. candidate variants under investigation) are kept only in `mockups/` and left out of `public/mockups/` until a direction is chosen.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and deploys `dist/` to GitHub Pages. The Vite `base` path in `vite.config.js` is set to `/jimson-sWebsite/` to match the Pages URL.
