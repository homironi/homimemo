import { getArticleMeta } from "@/lib/article";
import { ArticleMeta } from "@/schemas/article/meta";

/**
 * おすすめ記事の記事ID
 * @see recommendedArticles おすすめ記事Meta
 */
export const recommendedArticleIds : string[] = [
  "u7ax9hdyzzu3zkp5grbjazmt",
  "4m0x8paz57s6xzdv6llba90r",
  "1rzo1xgl9sna9y2apleb8of4",
  "y9gwahvcxi4fkbq52ws3a5q6",
];

/**
 * おすすめ記事の記事meta
 * @description 記事IDで取得できる前提で!で null回避しているのでエラーが出たら記事IDがおかしい可能性が高い
 */
export const recommendedArticles : ArticleMeta[] = recommendedArticleIds
  .map(id => getArticleMeta(id)!);
