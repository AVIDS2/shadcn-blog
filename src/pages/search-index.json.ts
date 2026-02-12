import { estimateReadingTime } from "../utils/format";
import { type SiteLocale, withLocalePrefix } from "../utils/i18n";
import { getPublishedPosts } from "../utils/posts";
import { stripMarkdown } from "../utils/search";

interface SearchDoc {
  id: string;
  locale: SiteLocale;
  kind: "page" | "post";
  title: string;
  description: string;
  tags: string[];
  content: string;
  date: string;
  readingTime: number;
  url: string;
}

export async function GET() {
  const locale: SiteLocale = "zh-CN";
  const posts = await getPublishedPosts(locale);

  const pageDocs: SearchDoc[] = [
    {
      id: "page-home",
      locale,
      kind: "page",
      title: "首页",
      description: "返回站点首页与首屏内容。",
      tags: ["home", "index"],
      content: "首页 站点 入口",
      date: new Date("2026-02-01").toISOString(),
      readingTime: 1,
      url: withLocalePrefix("/", locale),
    },
    {
      id: "page-posts",
      locale,
      kind: "page",
      title: "文章",
      description: "浏览所有已发布文章归档。",
      tags: ["posts", "archive"],
      content: "文章 归档 列表",
      date: new Date("2026-02-01").toISOString(),
      readingTime: 1,
      url: withLocalePrefix("/posts/", locale),
    },
    {
      id: "page-tags",
      locale,
      kind: "page",
      title: "标签",
      description: "按主题标签检索文章。",
      tags: ["tags", "topics"],
      content: "标签 主题 索引",
      date: new Date("2026-02-01").toISOString(),
      readingTime: 1,
      url: withLocalePrefix("/tags/", locale),
    },
    {
      id: "page-about",
      locale,
      kind: "page",
      title: "关于",
      description: "查看站点定位与作者信息。",
      tags: ["about", "profile"],
      content: "关于 说明 信息",
      date: new Date("2026-02-01").toISOString(),
      readingTime: 1,
      url: withLocalePrefix("/about/", locale),
    },
  ];

  const postDocs: SearchDoc[] = posts.map((post) => {
    const content = stripMarkdown(post.body).slice(0, 12000);
    return {
      id: post.id,
      locale,
      kind: "post",
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      content,
      date: post.data.date.toISOString(),
      readingTime: estimateReadingTime(post.body),
      url: withLocalePrefix(`/posts/${post.data.translationKey}/`, locale),
    };
  });

  const docs: SearchDoc[] = [...pageDocs, ...postDocs];

  return new Response(
    JSON.stringify({
      locale,
      generatedAt: new Date().toISOString(),
      docs,
    }),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    },
  );
}
