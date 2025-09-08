import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import { defaultArticleThumbnail } from "../article";

export const siteName = "ほみろに";
export const defaultDescription =
  "ゲームやお絵かきなどいろんなことを書く、ほみの個人サイトです。";
export const siteOrigin = "https://homironi.com";

export const noImageUrl = "/images/no-image.webp";

/**
 *
 * @param title
 * @param description
 * @param slug
 * @param thumbnail
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
 *
 * @param title
 * @param description
 * @param thumbnail
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
 *
 * @param title
 */
export function createTitleFromTemplate(title: string) {
  return `${title} | ${siteName}`;
}

/**
 *
 * @param slug
 */
export function createUrlFromSlug(slug: string) {
  return `${siteOrigin}${slug}`;
}

/**
 *
 * @param url
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
