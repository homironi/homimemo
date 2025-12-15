export const articleThumbnailNativeSize = { width: 1200, height: 630 };

/**
 * 記事詳細ページのパスを作成する
 * @param id 記事ID
 * @returns 記事詳細ページのパス
 */
export function createArticleDetailPath(id: string): string {
  return `/articles/${id}/`;
}

/**
 * サイト内の記事URLから記事IDを取得する
 * @param url 記事のURL
 * @returns 記事ID、記事URLでない場合はnull
 * @description 記事URLの形式は https://homironi.com/articles/{articleId} または http://localhost:{port}/articles/{articleId} (開発環境) を想定
 */
export function getSiteArticleUrl(url: URL): string | null {
  if (!isSiteOrigin(url)) {
    return null;
  }

  const articlePathPattern = /^\/articles\/([a-zA-Z0-9]{24})\/?$/;
  const match = articlePathPattern.exec(url.pathname);
  if (match === null || match.length < 2) {
    return null;
  }

  return match[1];
}

function isSiteOrigin(url: URL): boolean {
  if (import.meta.env.DEV) {
    const localhostPattern = /http:\/\/localhost:[0-9]+/;
    return localhostPattern.test(url.origin) || url.origin === import.meta.env.SITE;
  }

  return url.origin === import.meta.env.SITE;
}
