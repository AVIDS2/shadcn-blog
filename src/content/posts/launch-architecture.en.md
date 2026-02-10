---
locale: "en-US"
translationKey: "launch-architecture"
title: "Launch Architecture: Static-First Blog System"
description: "Why this blog uses a static-first architecture for performance, long-term maintainability, and effortless migration."
date: "2026-02-09"
tags: ["architecture", "performance", "astro", "seo"]
draft: false
---

This is the first architectural note for the current blog system. The objective is simple: keep runtime lightweight while preserving long-term operating capability.

## Constraint Matrix

| Requirement | Decision | Reason |
| --- | --- | --- |
| Long-term maintainability | Markdown as source of truth | Content and infrastructure stay decoupled |
| Strong performance | Static HTML output | Lowest runtime overhead |
| Easy migration | Build once to `dist/` | Host on Cloudflare now, VPS later |
| Search visibility | Sitemap + RSS + structured metadata | Better indexing and recrawl behavior |

## Performance Model

$$
T_{perceived} \approx T_{network} + T_{parse} + T_{paint}
$$

With static output, `T_parse` and `T_paint` variance stays predictable because client runtime is constrained.

## ECharts Demo (Markdown Native)

```echarts
{
  "tooltip": { "trigger": "axis" },
  "xAxis": {
    "type": "category",
    "data": ["Week 1", "Week 2", "Week 3", "Week 4"]
  },
  "yAxis": { "type": "value", "name": "ms" },
  "series": [
    {
      "name": "P95 Latency",
      "type": "line",
      "smooth": true,
      "data": [128, 96, 83, 71],
      "areaStyle": {}
    }
  ]
}
```

## Next Steps

1. Keep publishing and monitor crawl/indexing behavior.
2. Standardize media paths under `/public/images/posts/<slug>/`.
3. Add Lighthouse baseline checks in CI to prevent regressions.
