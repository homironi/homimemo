import { articleSchema, pageSchema, tagSchema } from "@/schemas/article/meta";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const tagsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./_contents/tags",
  }),
  schema: tagSchema,
});

const articlesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./_contents/articles",
    // 記事のIDをentryのidとして扱うようにする
    generateId: ({data}) => {
      const valid = articleSchema.parse(data);
      return valid.id;
    },
  }),
  schema: articleSchema,
});

const pagesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./_contents/static-pages",
  }),
  schema: pageSchema,
});

export const collections = {
  tags: tagsCollection,
  articles: articlesCollection,
  pages: pagesCollection,
};