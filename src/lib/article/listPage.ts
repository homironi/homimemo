// 記事一覧の1ページあたりの表示件数
export const articlePagePerNum = 12;

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
