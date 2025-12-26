import type { ArticleMeta, TagMetaWithSlug } from "@/schemas/article/meta";
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

/**
 * 記事配列から指定されたタグを持つ記事のみをフィルタリングする
 * @param articles 記事の配列
 * @param tagId 指定タグのID
 * @returns フィルタリングされた記事の配列
 */
export function filterArticlesByTag(articles: ArticleMeta[], tagId: string): ArticleMeta[] {
  return articles.filter(article => article.tags.map(v => v.id).includes(tagId));
}

/**
 * すべての静的ページを取得する
 * @returns 静的ページの配列
 */
export function getAllStaticPages(){
  return getCollection("pages");
}

/**
 * すべてのタグを取得する
 * @returns タグの配列
 */
export function getAllTags(){
  return getCollection("tags");
}

/**
 * すべてのタグをスラッグ付きで取得する
 * @returns スラッグ付きタグの配列
 */
export async function getAllTagWithSlugs(): Promise<TagMetaWithSlug[]> {
  const tags = await getAllTags();

  return tags.map(tag => ({
    ...tag.data,
    slug: tag.id,
  }));
}
