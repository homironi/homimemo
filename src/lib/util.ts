export const siteName = "ほみろに";
export const defaultDescription = "ゲームやお絵かきなどいろんなことを書く、ほみの個人サイトです。";

export const noImageUrl = "/images/no-image.webp";
export const defaultArticleThumbnail = "/images/header/default.webp";

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
  return `${import.meta.env.SITE}${slug}`;
}

export interface OpenGraphImage {
  url: string;
  alt: string;
}

export interface OpenGraph {
  title: string;
  description: string;
  url: string;
  images: OpenGraphImage[];
}

/**
 * OGPデータの作成
 * @param title タイトル
 * @param description 説明
 * @param slug スラッグ
 * @param thumbnail サムネイル
 * @returns OGPデータ
 */
export function createOGData(
  title?: string,
  description?: string,
  slug?: string,
  thumbnail?: string
): OpenGraph {
  const url = createUrlFromSlug(slug || "/");
  const titleText = title ? createTitleFromTemplate(title) : siteName;
  const imageUrl = thumbnail || defaultArticleThumbnail;
  return {
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

export interface TwitterCard {
  card: string;
  site: string;
  title: string;
  description: string;
  images: string[];
}

/**
 * Twitterカードデータの作成
 * @param title タイトル
 * @param description 説明
 * @param thumbnail サムネイル
 * @returns Twitterカードデータ
 */
export function createTwitterCardData(
  title?: string,
  description?: string,
  thumbnail?: string
): TwitterCard {
  const imageUrl = thumbnail || defaultArticleThumbnail;
  return {
    card: "summary",
    site: siteName,
    title: title ? createTitleFromTemplate(title) : siteName,
    description: description || defaultDescription,
    images: [
      imageUrl.startsWith("http") ? imageUrl : createUrlFromSlug(imageUrl), // 自身のサイトの場合はフルURLに変換
    ],
  };
}
