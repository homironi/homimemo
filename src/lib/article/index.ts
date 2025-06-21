import { CategoryMeta, TagMeta } from "@/schemas/article/meta";

export const articlesPath = "/articles/";

/**
 * 記事詳細ページのパスを作成する
 * @param id 記事ID
 * @returns 記事詳細ページのパス
 */
export function createArticleDetailPath(id: string): string {
  return `${articlesPath}${id}/`;
}

/**
 * カテゴリページのパスを作成する
 * @param category カテゴリ情報
 * @returns カテゴリページのパス
 */
export function createCategoriesPath(category: CategoryMeta): string {
  return `/categories/${category.slug}/`;
}

/**
 * タグページのパスを作成する
 * @param tag タグ情報
 * @returns タグページのパス
 */
export function createTagsPath(tag: TagMeta): string {
  return `/tags/${tag.slug}/`;
}
