import { CategoryMeta, TagMeta } from "@/schemas/article/meta";

export const articleThumbnailNativeSize = { width: 896, height: 504 };
export const defaultArticleThumbnail = "/images/header/default.webp";

// 記事一覧ページの最初のページのパス
export const articlesListPagePath = createFirstListPagePath("/articles/page/");

/**
 * 記事詳細ページのパスを作成する
 * @param id 記事ID
 * @returns 記事詳細ページのパス
 */
export function createArticleDetailPath(id: string): string {
  return `/articles/${id}/`;
}

/**
 * カテゴリごとの記事一覧ページの最初のページのパスを作成する
 * @param category カテゴリ情報
 * @returns カテゴリページの最初のページのパス
 */
export function createCategoryListFirstPagePath(category: CategoryMeta): string {
  return createFirstListPagePath(`/categories/${category.slug}/`);
}

/**
 * タグページのパスを作成する
 * @param tag タグ情報
 * @returns タグページのパス
 */
export function createTagsPath(tag: TagMeta): string {
  return `/tags/${tag.slug}/`;
}

/**
 * 記事一覧ページの最初のページのパスを作成する
 * @param basePath 記事一覧ページのベースパス
 * @returns 記事一覧ページの最初のページのパス
 */
function createFirstListPagePath(basePath: string): string {
  return `${basePath}1/`;
}
