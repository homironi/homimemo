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

export const TagMetaSchema = object({
  name: pipe(string(), minLength(1)),
  slug: pipe(string(), minLength(1)),
  description: optional(string()),
});

export const TagsMetaSchema = array(TagMetaSchema);
export type TagMeta = InferOutput<typeof TagMetaSchema>;

const metaSchemaBase = {
  id: pipe(string(), minLength(1)),
  title: pipe(string(), minLength(1)),
  draft: boolean(),
  publishDate: date(),
  lastModDate: date(),
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
  tags: optional(array(string())),
});

export type ArticleRawMeta = InferOutput<typeof ArticleRawMetaSchema>;

/**
 * 記事のメタデータのスキーマ
 */
export const ArticleMetaSchema = object({
  ...metaSchemaBase,
  category: CategoryMetaSchema,
  tags: optional(TagsMetaSchema),
});

export type ArticleMeta = InferOutput<typeof ArticleMetaSchema>;
