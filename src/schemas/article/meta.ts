import {
  array,
  boolean,
  date,
  InferOutput,
  minLength,
  nonEmpty,
  object,
  optional,
  pipe,
  safeParse,
  string,
  transform,
} from "valibot";

export const CategoryMetaSchema = object({
  name: pipe(string(), minLength(1, "カテゴリ名が設定されていません")),
  slug: pipe(string(), minLength(1, "slug が設定されていません")),
  description: optional(string()),
});

export const CategoriesMetaSchema = array(CategoryMetaSchema);
export type CategoryMeta = InferOutput<typeof CategoryMetaSchema>;

export const TagMetaSchema = object({
  name: pipe(string(), minLength(1)),
  slug: pipe(string(), minLength(1)),
  description: optional(string()),
});

export const TagsMetaSchema = array(TagMetaSchema);
export type TagMeta = InferOutput<typeof TagMetaSchema>;

const metaSchemaBase = {
  title: pipe(string(), minLength(1)),
  draft: boolean(),
  publishDate: date(),
  lastModDate: date(),
  thumbnail: optional(pipe(string(), nonEmpty())),
  description: pipe(string(), minLength(1)),
};

const articleMetaSchemaBase = {
  ...metaSchemaBase,
  id: pipe(string(), minLength(1)),
};

/**
 * 記事の生メタデータのスキーマ
 * @description まだ直接読み取っただけの状態
 */
export const ArticleRawMetaSchema = object({
  ...articleMetaSchemaBase,
  category: pipe(string(), minLength(1)),
  tags: optional(array(string())),
});

export type ArticleRawMeta = InferOutput<typeof ArticleRawMetaSchema>;

/**
 * 記事のメタデータJSONからのスキーマ
 */
export const ArticleMetaFromJsonSchema = object({
  ...articleMetaSchemaBase,
  publishDate: pipe(
    string(),
    transform((date) => new Date(date))
  ),
  lastModDate: pipe(
    string(),
    transform((date) => new Date(date))
  ),
  category: CategoryMetaSchema,
  tags: optional(TagsMetaSchema),
});

/**
 * 記事のメタデータのスキーマ
 */
export const ArticleMetaSchema = object({
  ...articleMetaSchemaBase,
  category: CategoryMetaSchema,
  tags: optional(TagsMetaSchema),
});

// 記事のメタデータの型
export type ArticleMeta = InferOutput<typeof ArticleMetaSchema>;

/**
 * @see ArticleMeta かどうかを確認する
 * @param data 確認したいデータ
 * @returns @see ArticleMeta かどうか
 */
export function isArticleMeta(data:unknown) : data is ArticleMeta{
  return safeParse(ArticleMetaSchema, data).success;
}

/**
 * 固定記事のメタデータのスキーマ
 */
export const StaticArticleMetaSchema = object({
  ...metaSchemaBase,
  slug: pipe(string(), minLength(1)),
});

// 固定の記事のメタデータの型
export type StaticArticleMeta = InferOutput<typeof StaticArticleMetaSchema>;
