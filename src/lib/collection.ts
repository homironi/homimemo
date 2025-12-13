import type { ArticleMeta } from "@/content.config";
import { getCollection, getEntry } from "astro:content";

/**
 * すべての記事を取得する
 * @returns 記事の配列
 */
export function getAllArticles(){
  return getCollection("articles");
}

/**
 * 記事IDに一致するメタデータを取得する
 * @param id 記事ID
 * @returns 記事のメタデータ
 */
export async function getArticle(id: string): Promise<ArticleMeta> {
  const entry = await getEntry("articles", id);
  if (!entry) {
    throw new Error(`Article with ID "${id}" not found.`);
  }

  return entry.data;
}