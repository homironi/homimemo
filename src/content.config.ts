import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const tagSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const tagsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./_contents/tags",
  }),
  schema: tagSchema,
});

const baseContentSchema = z.object({
  title: z.string(),
  draft: z.boolean(),
  publishDate: z.coerce.date(),
  lastModDate: z.coerce.date(),
  thumbnail: z.string().optional(),
  description: z.string(),
});

const articleSchema = baseContentSchema.extend({
  id: z.string(),
  tags: z.array(reference("tags")),
  draft: z.boolean(),
  thumbnail: z.string().optional(),
});

const articlesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./_contents/articles",
    // 記事のIDをentryのidとして扱うようにする
    generateId: ({data}) => {
      const valid = articleSchema.parse(data);
      return valid.id;
    },
  }),
  schema: articleSchema,
});

const pageSchema = baseContentSchema.extend({
});

const pagesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./_contents/static-articles", // TODO：フォルダ名変更検討
  }),
  schema: pageSchema,
});

export const collections = {
  tags: tagsCollection,
  articles: articlesCollection,
  pages: pagesCollection,
};