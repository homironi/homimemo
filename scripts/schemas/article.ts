import z from "zod";

export const tagSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  slug: z.string().min(1),
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
  tags: z.array(z.string()),
  draft: z.boolean(),
  thumbnail: z.string().optional(),
});

export type ArticleMeta = z.infer<typeof articleSchema>;
