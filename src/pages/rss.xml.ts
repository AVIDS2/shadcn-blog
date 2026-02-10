import rss from "@astrojs/rss";
import { getPublishedPosts } from "../utils/posts";

export async function GET(context: { site?: string | URL }) {
  const posts = await getPublishedPosts("zh-CN");

  return rss({
    title: "DWILL Blog",
    description:
      "A lightweight static engineering blog focused on architecture, product, and performance.",
    site: context.site ?? "https://blog2.dwill.top",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.data.translationKey}/`,
      categories: post.data.tags,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
