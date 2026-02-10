import { getCollection, type CollectionEntry } from "astro:content";
import type { SiteLocale } from "./i18n";

export type PostEntry = CollectionEntry<"posts">;

export async function getPublishedPosts(locale: SiteLocale): Promise<PostEntry[]> {
  const posts = await getCollection(
    "posts",
    ({ data }) => !data.draft && data.locale === locale,
  );
  return posts.sort(
    (left, right) => right.data.date.valueOf() - left.data.date.valueOf(),
  );
}

export async function getAllTagsWithCount(locale: SiteLocale): Promise<Array<[string, number]>> {
  const posts = await getPublishedPosts(locale);
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }

  return [...tagMap.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function formatTagForPath(tag: string): string {
  return encodeURIComponent(tag.toLowerCase());
}
