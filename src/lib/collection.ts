import { getCollection } from "astro:content";

/**
 * すべての記事を取得する
 * @returns 記事の配列
 */
export function getAllArticles(){
  return getCollection("articles");
}