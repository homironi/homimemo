import { getArticle } from "@/lib/collection";
import { type ArticleMeta } from "@/schemas/article/meta";

/**
 * おすすめ記事の記事ID
 * @see recommendedArticles おすすめ記事Meta
 */
export const recommendedArticleIds : string[] = [
  "88d7hu7jso7m0691ue2rvfn4",
  "qh166qblptc3q4m1yoxqxus5",
];

/**
 * おすすめ記事の記事meta
 * @description 記事IDで取得できる前提で!で null回避しているのでエラーが出たら記事IDがおかしい可能性が高い
 */
export const recommendedArticles : Promise<ArticleMeta[]> = Promise.all(
  recommendedArticleIds.map(id => getArticle(id)!)
);
