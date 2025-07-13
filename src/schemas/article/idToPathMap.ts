import { InferOutput, minLength, object, pipe, string } from "valibot";

/**
 * 記事のIDとファイルパスのマップの要素のスキーマ
 */
export const ArticleIdToPathMapElementSchema = object({
  /**
   * 記事のID
   */
  id: pipe(string(), minLength(1, "記事のIDが設定されていません")),

  /**
   * 記事のファイルパス
   */
  filePath: pipe(string(), minLength(1, "記事のファイルパスが設定されていません")),
});

/**
 * 記事のIDとファイルパスのマップの要素の型
 */
export type ArticleIdToPathMapElement = InferOutput<typeof ArticleIdToPathMapElementSchema>;
