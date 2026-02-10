---
locale: "zh-CN"
translationKey: "launch-architecture"
title: "发布说明：静态优先博客架构"
description: "为什么这个博客坚持静态优先，以获得性能、可维护性和低迁移成本。"
date: "2026-02-09"
tags: ["architecture", "performance", "astro", "seo"]
draft: false
---

这篇文章是当前博客系统的首篇说明文档，目标只有一个：在保持轻量体量的前提下，提供长期运营能力。

## Constraint Matrix

| 需求 | 决策 | 原因 |
| --- | --- | --- |
| 长期维护 | Markdown 作为内容源 | 内容和基础设施解耦 |
| 性能稳定 | 输出纯静态 HTML | 运行时开销最低 |
| 易于迁移 | 构建统一到 `dist/` | 先 Cloudflare，后 VPS |
| 搜索可见 | Sitemap + RSS + 结构化数据 | 收录与再抓取更稳定 |

## Performance Model

$$
T_{perceived} \approx T_{network} + T_{parse} + T_{paint}
$$

在静态站模式下，`T_parse` 和 `T_paint` 的波动更可控，因为运行时脚本被严格约束。

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

1. 持续发布文章并观察搜索引擎收录。
2. 建立统一图片目录规范：`/public/images/posts/<slug>/`。
3. 在 CI 中加入 Lighthouse 基线，避免性能回归。
