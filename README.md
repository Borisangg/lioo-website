# Lioo Website

The public marketing website for **Lioo**, an AI-powered personal stylist.

## Languages

The site has two languages: English at `/` and Bulgarian at `/bg/` (same pages, same layout).
`lang.js` sends first-time visitors with a Bulgarian browser to `/bg/` and remembers a manual
EN / BG choice. When you change text on an English page, change the matching Bulgarian page in `bg/` too.

## Pages

- Home
- About
- Features
- How It Works
- Contact

## Run locally

```bash
cd /Users/borisangelov/Lioo/lioo-website
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Project structure

```text
lioo-website/
├── index.html
├── about/
├── features/
├── how-it-works/
├── contact/
├── images/
├── style.css
├── pages.css
├── script.js
└── site-config.js
```

The website is intentionally static: no build step and no hidden runtime dependencies. GitHub Pages deploys the repository automatically after changes reach `main`.

The product destination is configured once in `site-config.js` and points to `https://app.liooclo.com`.

Legacy product routes on the marketing domain redirect to the matching route on the application domain. Query strings and URL fragments are preserved so password reset and authentication links continue to work after the domain split.

## Deployment

GitHub Actions publishes the site to GitHub Pages on every push to `main`. The workflow can also be started manually from the Actions tab.

## Ownership

Copyright © 2026 DagMart LTD. All rights reserved.
