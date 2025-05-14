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

/**
 * 記事のメタデータのスキーマ
 */
export const ArticleMetaSchema = object({
  id: pipe(string(), minLength(1)),
  title: pipe(string(), minLength(1)),
  draft: boolean(),
  publishDate: date(),
  lastModDate: date(),
  category: pipe(string(), minLength(1)),
  tags: optional(array(string())),
  thumbnail: optional(string()),
  description: pipe(string(), minLength(1)),
});

export type ArticleMeta = InferOutput<typeof ArticleMetaSchema>;
