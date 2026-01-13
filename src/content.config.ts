import { articleSchema, pageSchema, tagSchema } from "@/schemas/article/meta";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import path from "path";
import { affiliateSchema } from "./schemas/affiliate";

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

// https://www.amazon.co.jp/dp/ の後の部分をキー（ファイル名）にした「もしもアフィリエイト」のかんたんリンク
const affiliateCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./_contents/affiliate",
    generateId: ({entry}) => {
      // idに大文字が入ることがある都合上、ファイル名（拡張子なし）をslug化させずそのまま使う
      return path.basename(entry, path.extname(entry));
    },
  }),
  schema: affiliateSchema,
});

export const collections = {
  tags: tagsCollection,
  articles: articlesCollection,
  pages: pagesCollection,
  affiliates: affiliateCollection,
};
