import { CategoryMeta, TagMeta } from "@/schemas/article/meta";

// 記事一覧の1ページあたりの表示件数
export const articlePagePerNum = 12;

// 記事一覧ページの最初のページのパス
export const articlesListPagePath = createFirstListPagePath("/articles/page/");

const categoryListPagePath = "/categories/";

/**
 * 記事の総数からページ番号の配列を生成する関数
 * @param length 記事の総数
 * @returns ページ番号の配列
 */
export function getPageLength(length: number): number[] {
  const validLength = length <= 0 ? 1 : length;
  const pageLength = Math.ceil(validLength / articlePagePerNum);
  return Array.from({ length: Math.ceil(pageLength) }, (_, i) => i + 1);
}

/**
 * カテゴリごとの記事一覧ページの最初のページのパスを作成する
 * @param category カテゴリ情報
 * @returns カテゴリページの最初のページのパス
 */
export function createCategoryListFirstPagePath(category: CategoryMeta): string {
  return createFirstListPagePath(`${categoryListPagePath}${category.slug}/`);
}

/**
 * カテゴリごとの記事一覧ページのパスを作成する
 * @param category カテゴリ情報
 * @param page ページ番号
 * @returns カテゴリページの最初のページのパス
 */
export function createCategoryListPagePath(category: CategoryMeta, page: number): string {
  return `${categoryListPagePath}${category.slug}/${page}/`;
}

/**
 * タグごとの一覧ページのパスを作成する
 * @param tag タグ情報
 * @param page ページ番号
 * @returns タグ一覧ページのパス
 */
export function createTagsPath(tag: TagMeta, page?: number): string {
  return `/tags/${tag.slug}/${page ? page : 1}/`;
}

/**
 * 全記事一覧ページの最初のページのパスを作成する
 * @param page ページ番号
 * @returns 全記事一覧ページのパス
 */
export function createArticleListPagePath(page: number): string {
  return `${articlesListPagePath}${page}/`;
}

/**
 * 記事一覧ページの最初のページのパスを作成する
 * @param basePath 記事一覧ページのベースパス
 * @returns 記事一覧ページの最初のページのパス
 */
function createFirstListPagePath(basePath: string): string {
  return `${basePath}1/`;
}
