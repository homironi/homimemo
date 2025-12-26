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

/**
 * マークダウンテキストから記法を除いた純粋な文字数をカウントする
 * @param markdown マークダウン形式の文字列
 * @returns 純粋な文字数
 */
export function countMarkdownCharacters(markdown: string): number {
  let text = markdown;

  // コードブロック（```で囲まれた部分）を先に処理
  text = text.replace(/```[\s\S]*?```/g, (match) => {
    // コードブロック内の改行以外の文字をカウント
    const codeContent = match.replace(/```[^\n]*\n?/g, "").replace(/\n```$/g, "");
    return codeContent;
  });

  // インラインコード（`で囲まれた部分）
  text = text.replace(/`([^`]+)`/g, "$1");

  // 見出し（# ## ### など）
  text = text.replace(/^#+\s*/gm, "");

  // 太字・斜体記法
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "$1"); // 太字斜体
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");     // 太字
  text = text.replace(/\*(.+?)\*/g, "$1");         // 斜体
  text = text.replace(/___(.+?)___/g, "$1");       // 太字斜体
  text = text.replace(/__(.+?)__/g, "$1");         // 太字
  text = text.replace(/_(.+?)_/g, "$1");           // 斜体

  // 取り消し線
  text = text.replace(/~~(.+?)~~/g, "$1");

  // リンク記法 [テキスト](URL)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // 画像記法 ![alt](URL)
  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, "");
  
  // チェックリスト（- [ ] または - [x] で始まる行）
  text = text.replace(/^[\s]*[-*+]\s*\[[\sx]\]\s*/gmi, "");

  // リスト記法（- * + で始まる行）
  text = text.replace(/^[\s]*[-*+]\s+/gm, "");

  // 番号付きリスト（1. 2. など）
  text = text.replace(/^[\s]*\d+\.\s+/gm, "");

  // テーブル記法の処理
  text = text.replace(/^\s*\|.*\|\s*$/gm, (match) => {
    // テーブルの区切り行（|---|---|）を除外
    if (/^\s*\|[\s\-|:]*\|\s*$/.test(match)) {
      return "";
    }
    // テーブルのセル内容のみを抽出（|を除去してセルの内容を結合）
    return match
      .split("|")
      .slice(1, -1) // 最初と最後の空文字を除去
      .map(cell => cell.trim())
      .join(" ") + "\n";
  });

  // 引用記法（> で始まる行）
  text = text.replace(/^[\s]*>\s*/gm, "");

  // 水平線（--- *** ___）
  text = text.replace(/^[\s]*[-*_]{3,}[\s]*$/gm, "");

  // HTMLタグ（マークダウン内のHTML）
  text = text.replace(/<[^>]+>/g, "");

  // 参照リンク記法 [text][ref] と [ref]: URL
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1");
  text = text.replace(/^[\s]*\[[^\]]+\]:\s*.+$/gm, "");

  // エスケープ文字（\）
  text = text.replace(/\\(.)/g, "$1");

  // 余分な空白行を整理
  text = text.replace(/\n\s*\n/g, "\n");
  text = text.trim();
  
  return text.length;
}
