import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import { defaultArticleThumbnail } from "../article";

export const siteName = "ほみろに";
export const defaultDescription =
  "ゲームやお絵かきなどいろんなことを書く、ほみの個人サイトです。";
export const siteOrigin = "https://homironi.com";

export const noImageUrl = "/images/no-image.webp";

/**
 * デフォルトのOGPデータ
 * @param title タイトル
 * @param description 説明
 * @param slug スラッグ
 * @param thumbnail サムネイル
 * @returns OGPデータ
 */
export function createDefaultOG(
  title?: string,
  description?: string,
  slug?: string,
  thumbnail?: string
): OpenGraph {
  const url = createUrlFromSlug(slug || "/");
  const titleText = title ? createTitleFromTemplate(title) : siteName;
  const imageUrl = thumbnail || defaultArticleThumbnail;
  return {
    siteName: siteName,
    title: titleText,
    description: description || defaultDescription,
    url,
    images: [
      {
        url: imageUrl.startsWith("http")
          ? imageUrl
          : createUrlFromSlug(imageUrl), // 自身のサイトの場合はフルURLに変換
        alt: titleText,
      },
    ],
  };
}

/**
 * デフォルトのTwitterカードデータ
 * @param title タイトル
 * @param description 説明
 * @param thumbnail サムネイル
 * @returns Twitterカードデータ
 */
export function createDefaultTwitter(
  title?: string,
  description?: string,
  thumbnail?: string
): Twitter {
  const imageUrl = thumbnail || defaultArticleThumbnail;
  return {
    card: "summary_large_image",
    site: siteName,
    title: title ? createTitleFromTemplate(title) : siteName,
    description: description || defaultDescription,
    images: [
      imageUrl.startsWith("http") ? imageUrl : createUrlFromSlug(imageUrl), // 自身のサイトの場合はフルURLに変換
    ],
  };
}

/**
 * タイトルをテンプレートから生成する
 * @param title タイトル
 * @returns テンプレートから生成されたタイトル
 */
export function createTitleFromTemplate(title: string) {
  return `${title} | ${siteName}`;
}

/**
 * URLをスラッグから生成する
 * @param slug スラッグ
 * @returns スラッグから生成されたURL
 * @description スラッグは先頭に/をつけること
 */
export function createUrlFromSlug(slug: string) {
  return `${siteOrigin}${slug}`;
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
  if (process.env.NODE_ENV === "development") {
    const localhostPattern = /http:\/\/localhost:[0-9]+/;
    return localhostPattern.test(url.origin) || url.origin === siteOrigin;
  }

  return url.origin === siteOrigin;
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
