import { reference, z } from "astro:content";

export const tagSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export type TagMeta = z.infer<typeof tagSchema>;

const baseContentSchema = z.object({
  title: z.string(),
  draft: z.boolean(),
  publishDate: z.coerce.date(),
  lastModDate: z.coerce.date(),
  thumbnail: z.string().optional(),
  description: z.string(),
});

export const articleSchema = baseContentSchema.extend({
  id: z.string(),
  tags: z.array(reference("tags")),
  draft: z.boolean(),
  thumbnail: z.string().optional(),
});

export type ArticleMeta = z.infer<typeof articleSchema>;

export const pageSchema = baseContentSchema.extend({
});

export type StaticPageMeta = z.infer<typeof pageSchema>;
