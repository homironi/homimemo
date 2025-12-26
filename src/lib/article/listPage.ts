
// 記事一覧の1ページあたりの表示件数
export const articlePagePerNum = 12;

export const articleListPagePath = "/articles/";
export const articleListPagePathBase = `${articleListPagePath}page/`;
export const tagsPagePath = "/tags/";

// 記事一覧ページの最初のページのパス
export const articlesListPagePath = createArticleListPagePath(1);

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
 * タグごとの一覧ページの「page」抜きのパスを作成する
 * @param tagSlug タグのスラッグ
 * @returns タグごとの一覧ページの「page」抜きのパス
 */
export function createTagsPagePath(tagSlug: string): string {
  return `${tagsPagePath}${tagSlug}/`;
}

/**
 * タグごとの一覧ページのベースパスを作成する
 * @param tagSlug タグのスラッグ
 * @returns タグ一覧ページのベースパス
 */
export function createTagsPathBase(tagSlug: string): string {
  return `${createTagsPagePath(tagSlug)}page/`;
}

/**
 * タグごとの一覧ページのパスを作成する
 * @param tagSlug タグのスラッグ
 * @param page ページ番号
 * @returns タグ一覧ページのパス
 */
export function createTagListPagePath(tagSlug: string, page?: number): string {
  if(!page || page === 1){
    return createTagsPagePath(tagSlug);
  }

  return `${createTagsPathBase(tagSlug)}${page}/`;
}

/**
 * 全記事一覧ページのパスを作成する
 * @param page ページ番号
 * @returns 全記事一覧ページのパス
 */
export function createArticleListPagePath(page: number): string {
  if(page === 1){
    return articleListPagePath;
  }

  return `${articleListPagePathBase}${page}/`;
}
