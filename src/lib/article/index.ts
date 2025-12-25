export const articleThumbnailNativeSize = { width: 1200, height: 630 };

/**
 * 記事詳細ページのパスを作成する
 * @param id 記事ID
 * @returns 記事詳細ページのパス
 */
export function createArticleDetailPath(id: string): string {
  return `/articles/${id}/`;
}
