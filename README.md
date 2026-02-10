# DWILL Blog (Static-First)

Ultra-lightweight static blog for `blog2.dwill.top`, built with Astro.

## Core Principles

- Markdown is the single source of truth.
- Build output is pure static files in `dist/`.
- Runtime JavaScript is minimal and strictly opt-in.
- URL structure stays stable across Cloudflare Pages and VPS hosting.
- Text files must be saved as UTF-8 (especially on Windows) to avoid Chinese garbled text.

## Encoding Rule (Windows Important)

- Always save `.astro`, `.ts`, `.js`, `.css`, `.md`, `.json` as `UTF-8`.
- Do not use system-default ANSI/GBK encoding for source files.
- The repository includes `.editorconfig` with `charset = utf-8`.

## URL Strategy

- Home: `/`
- Posts index: `/posts/`
- Post detail: `/posts/<slug>/`
- Tags index: `/tags/`
- Tag detail: `/tags/<tag>/`
- RSS: `/rss.xml`
- Sitemap: `/sitemap-index.xml`

## Quick Start

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Preview built site:

```bash
npm run preview
```

## Content Workflow

1. Ask AI to generate Markdown (`.md`) with frontmatter.
2. Review content quality (facts, links, tone, grammar).
3. Save into `src/content/posts/`.
4. Run local preview.
5. Deploy.

### Frontmatter Template

```md
---
title: "Post title"
description: "One-line summary for SEO and feeds."
date: "2026-02-09"
updated: "2026-02-09" # optional
tags: ["architecture", "performance"]
draft: false
---
```

## Markdown Features Enabled

- GFM tables/task lists via `remark-gfm`
- LaTeX via `remark-math` + `rehype-katex`
- Heading anchors via `rehype-slug` + `rehype-autolink-headings`
- ECharts via fenced code block:

````md
```echarts
{ "xAxis": { "type": "category", "data": ["A", "B"] }, "yAxis": { "type": "value" }, "series": [{ "type": "bar", "data": [3, 9] }] }
```
````

## Hero Effect System (Pluggable)

Homepage animation is componentized and switchable:

- Active setting: `src/config/hero-effects.ts`
- Effect host: `src/components/hero-effects/HeroEffectHost.astro`
- Current effects:
  - `particle-funnel` (Canvas particle + funnel scene)
  - `static-minimal` (non-animated fallback style)

To switch effect, only change:

```ts
export const heroEffects = {
  active: "static-minimal",
} as const;
```

## Image Storage Convention

- Store article images under:
  - `public/images/posts/<slug>/...`
- Keep names deterministic:
  - `hero.webp`, `chart-01.webp`, `diagram-architecture.avif`
- Prefer AVIF/WebP and multiple sizes for responsive loading.

## Deployment

### Cloudflare Pages (Current)

Create a Pages project:

- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: your main branch

Or CLI deploy:

```bash
npx wrangler whoami
npm run deploy:cf
```

If this is your first deploy with a new project, run:

```bash
npx wrangler pages deploy dist --project-name <your-pages-project>
```

### VPS Migration (Future)

Same repository, same build output:

```bash
git pull
npm ci
npm run build
```

Then serve `dist/` using Nginx/Caddy/static server.

No route rewrite changes are required if domain remains `blog2.dwill.top`.

## SEO Checklist

- [x] Canonical per page
- [x] OpenGraph + Twitter meta
- [x] JSON-LD article schema
- [x] `sitemap-index.xml`
- [x] `robots.txt`
- [x] `rss.xml`
- [ ] Submit sitemap in Google Search Console
- [ ] Submit sitemap in Bing Webmaster Tools
