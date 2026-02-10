import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    locale: z.enum(["zh-CN", "en-US"]),
    translationKey: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1).max(180),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z
      .array(z.string().min(1))
      .default([])
      .transform((tags) => tags.map((tag) => tag.trim().toLowerCase())),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

export const collections = { posts };
