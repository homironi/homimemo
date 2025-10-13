import { CategoryMeta, TagMeta } from "@/schemas/article/meta";

// 記事一覧の1ページあたりの表示件数
export const articlePagePerNum = 12;

const articleListPagePath = "/articles/";
export const articleListPagePathBase = `${articleListPagePath}page/`;

// 記事一覧ページの最初のページのパス
export const articlesListPagePath = createArticleListPagePath(1);

const categoryListPagePath = "/categories/";

/**
 * 記事の総数からページ番号の配列を生成する関数
 * @param length 記事の総数
 * @returns ページ番号の配列（1～）
 */
export function getPageLength(length: number): number[] {
  const validLength = length <= 0 ? 1 : length;
  const pageLength = Math.ceil(validLength / articlePagePerNum);
  return Array.from({ length: Math.ceil(pageLength) }, (_, i) => i + 1);
}

/**
 * カテゴリごとの記事一覧ページの「page」抜きのパスを作成する
 * @param category カテゴリ情報
 * @returns カテゴリごとの記事一覧ページの「page」抜きのパス
 */
function createCategoriesPath(category: CategoryMeta): string {
  return `${categoryListPagePath}${category.slug}/`;
}

/**
 * カテゴリごとの記事一覧ページのベースパスを作成する
 * @param category カテゴリ情報
 * @returns カテゴリごとの記事一覧ページのベースパス
 */
export function createCategoryListPagePathBase(category: CategoryMeta): string {
  return `${createCategoriesPath(category)}page/`;
}

/**
 * カテゴリごとの記事一覧ページのパスを作成する
 * @param category カテゴリ情報
 * @param page ページ番号
 * @returns カテゴリページの最初のページのパス
 */
export function createCategoryListPagePath(category: CategoryMeta, page?: number): string {
  if(!page || page === 1){
    return createCategoriesPath(category);
  }

  return `${createCategoryListPagePathBase(category)}${page}/`;
}

/**
 * タグごとの一覧ページの「page」抜きのパスを作成する
 * @param tag タグ情報
 * @returns タグごとの一覧ページの「page」抜きのパス
 */
function createTagsPagePath(tag: TagMeta): string {
  return `/tags/${tag.slug}/`;
}

/**
 * タグごとの一覧ページのベースパスを作成する
 * @param tag タグ情報
 * @returns タグ一覧ページのベースパス
 */
export function createTagsPathBase(tag: TagMeta): string {
  return `${createTagsPagePath(tag)}/page/`;
}

/**
 * タグごとの一覧ページのパスを作成する
 * @param tag タグ情報
 * @param page ページ番号
 * @returns タグ一覧ページのパス
 */
export function createTagsPath(tag: TagMeta, page?: number): string {
  if(!page || page === 1){
    return createTagsPagePath(tag);
  }

  return `${createTagsPathBase(tag)}${page}/`;
}

/**
 * 全記事一覧ページの最初のページのパスを作成する
 * @param page ページ番号
 * @returns 全記事一覧ページのパス
 */
export function createArticleListPagePath(page: number): string {
  if(page === 1){
    return articleListPagePath;
  }

  return `${articleListPagePathBase}${page}/`;
}
