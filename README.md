# Lioo Website

The public marketing website for **Lioo**, an AI-powered personal stylist.

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

The product destination is configured once in `site-config.js`. Update `appUrl` there when the product moves to `app.liooclo.com`.

## Deployment

GitHub Actions publishes the site to GitHub Pages on every push to `main`. The workflow can also be started manually from the Actions tab.

## Ownership

Copyright © 2026 DagMart LTD. All rights reserved.
