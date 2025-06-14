import {
  array,
  boolean,
  date,
  InferOutput,
  minLength,
  object,
  optional,
  pipe,
  string,
} from "valibot";

export const CategoryMetaSchema = object({
  name: pipe(string(), minLength(1, "カテゴリ名が設定されていません")),
  slug: pipe(string(), minLength(1, "slug が設定されていません")),
  description: optional(string()),
});

export const CategoriesMetaSchema = array(CategoryMetaSchema);

export type CategoryMeta = InferOutput<typeof CategoryMetaSchema>;
export type CategoriesMeta = InferOutput<typeof CategoriesMetaSchema>;

const metaSchemaBase = {
  id: pipe(string(), minLength(1)),
  title: pipe(string(), minLength(1)),
  draft: boolean(),
  publishDate: date(),
  lastModDate: date(),
  tags: optional(array(string())),
  thumbnail: optional(string()),
  description: pipe(string(), minLength(1)),
};

/**
 * 記事の生メタデータのスキーマ
 * @description まだ直接読み取っただけの状態
 */
export const ArticleRawMetaSchema = object({
  ...metaSchemaBase,
  category: pipe(string(), minLength(1)),
});

export type ArticleRawMeta = InferOutput<typeof ArticleRawMetaSchema>;

/**
 * 記事のメタデータのスキーマ
 */
export const ArticleMetaSchema = object({
  ...metaSchemaBase,
  category: CategoryMetaSchema,
});

export type ArticleMeta = InferOutput<typeof ArticleMetaSchema>;
