# Deploying to GitHub + Vercel

This is a **pure static site** — no build step, no npm install, no backend. Vercel
just serves the files as they are.

---

## 1. Push to GitHub

From this folder:

```bash
git init
git add .
git commit -m "NCEA Level 3 Study Hub"
git branch -M main
```

Then create an empty repo on GitHub (no README, no .gitignore — this folder
already has them), copy its URL, and:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Private or public?

**Make it private.** `data/results.js` contains your real NZQA Record of
Learning — every standard, grade and credit total. A private repo still deploys
to Vercel exactly the same way.

---

## 2. Deploy on Vercel

1. Go to <https://vercel.com/new>
2. **Import** the GitHub repo you just pushed
3. When it asks for settings:
   - **Framework Preset:** Other
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (it serves the repo root)
   - **Install Command:** leave empty
4. Click **Deploy**

You'll get a URL like `your-repo.vercel.app`. Every `git push` after that
redeploys automatically.

---

## What the config files do

| File | Purpose |
|---|---|
| `vercel.json` | Tells Vercel not to cache `.js`/`.css`, so an edit shows up on the next refresh instead of serving a stale module. |
| `.vercelignore` | Keeps `serve.py` and the internal status doc out of the deployment. |
| `.gitignore` | Keeps `.DS_Store`, Python caches and local editor config out of the repo. |

**No rewrite rules are needed.** The site uses hash routing (`#/topic/chem-91391`),
so every URL the server ever sees is just `/` — the browser handles the rest.
That's also why it works on GitHub Pages, Netlify or Cloudflare Pages with the
same zero configuration.

---

## Running it locally

Vercel is for sharing it. To work on it locally, use the included server:

```bash
python3 serve.py
```

Then open <http://localhost:8000>.

Use `serve.py` rather than `python3 -m http.server` — it sends no-cache headers,
and browsers cache ES modules hard enough that you'll otherwise keep seeing your
old edits after saving a file.

---

## A note on your data

All your study progress — streak, flagged topics, flashcard boxes, quiz scores,
internals and any credit edits — lives in **`localStorage` in your browser**, not
in these files. That means:

- Deploying does **not** upload your progress anywhere.
- Opening the Vercel URL on your phone starts you at zero on that device;
  progress does not sync between devices.
- Clearing your browser data for the site clears your progress.

The only personal information in the repo itself is the four data files listed
in [SETUP.md](SETUP.md) — chiefly `data/results.js`, which is why the repo should
be private.

---

## 3. Clean URLs (no `#`)

Routing is **history-based**, so pages are real paths: `studyhubnz.com/progress`,
not `studyhubnz.com/#/progress`.

That means the host has to serve `index.html` for any path that is not a real
file, or a cold load of `/progress` 404s. Config for all three common hosts
ships in this repo:

| Host | File | What it does |
|---|---|---|
| **Vercel** (what you're using) | `vercel.json` | `rewrites` sends every non-asset path to `/index.html` |
| Netlify | `_redirects` | `/*  /index.html  200` |
| GitHub Pages | `404.html` | a copy of `index.html`; Pages serves it for unknown paths |

Old `#/...` links still work: the router rewrites them to the clean path once,
in place, so nothing bookmarked or shared breaks.

⚠️ **GitHub Pages project sites are a special case.** At
`username.github.io/Repo/` the app is not at the domain root, so the
root-absolute links (`/progress`) point at the wrong place. Use a custom domain
(studyhubnz.com) or a user/org root repo. Vercel with the custom domain is the
intended setup and has no such problem.

⚠️ **If the deployed site shows a Vercel login page**, Deployment Protection is
on. Vercel dashboard → project → Settings → Deployment Protection → Vercel
Authentication → **Disabled**.
