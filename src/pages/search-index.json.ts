import { estimateReadingTime } from "../utils/format";
import { type SiteLocale, withLocalePrefix } from "../utils/i18n";
import { getPublishedPosts } from "../utils/posts";
import { stripMarkdown } from "../utils/search";

interface SearchDoc {
  id: string;
  locale: SiteLocale;
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

  const docs: SearchDoc[] = posts.map((post) => {
    const content = stripMarkdown(post.body).slice(0, 12000);
    return {
      id: post.id,
      locale,
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      content,
      date: post.data.date.toISOString(),
      readingTime: estimateReadingTime(post.body),
      url: withLocalePrefix(`/posts/${post.data.translationKey}/`, locale),
    };
  });

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
