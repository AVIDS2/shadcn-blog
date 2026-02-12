import { estimateReadingTime } from "../../utils/format";
import { type SiteLocale, withLocalePrefix } from "../../utils/i18n";
import { getPublishedPosts } from "../../utils/posts";
import { stripMarkdown } from "../../utils/search";

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
  const locale: SiteLocale = "en-US";
  const posts = await getPublishedPosts(locale);

  const pageDocs: SearchDoc[] = [
    {
      id: "page-home",
      locale,
      kind: "page",
      title: "Home",
      description: "Back to landing page and hero sections.",
      tags: ["home", "index"],
      content: "home landing overview",
      date: new Date("2026-02-01").toISOString(),
      readingTime: 1,
      url: withLocalePrefix("/", locale),
    },
    {
      id: "page-posts",
      locale,
      kind: "page",
      title: "Posts",
      description: "Browse all published articles in archive.",
      tags: ["posts", "archive"],
      content: "posts archive list",
      date: new Date("2026-02-01").toISOString(),
      readingTime: 1,
      url: withLocalePrefix("/posts/", locale),
    },
    {
      id: "page-tags",
      locale,
      kind: "page",
      title: "Tags",
      description: "Explore articles by topic tags.",
      tags: ["tags", "topics"],
      content: "tags topics index",
      date: new Date("2026-02-01").toISOString(),
      readingTime: 1,
      url: withLocalePrefix("/tags/", locale),
    },
    {
      id: "page-about",
      locale,
      kind: "page",
      title: "About",
      description: "Read profile and site positioning.",
      tags: ["about", "profile"],
      content: "about profile information",
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
