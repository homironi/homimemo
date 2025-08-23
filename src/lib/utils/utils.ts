import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import { defaultArticleThumbnail } from "../article";

export const siteName = "ほみろに";
export const defaultDescription =
  "ゲームやお絵かきなどいろんなことを書く、ほみの個人サイトです。";

export const noImageUrl = "/images/no-image.webp";

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

export function createDefaultTwitter(
  title?: string,
  description?: string,
  thumbnail?: string
): Twitter {
  return {
    card: "summary_large_image",
    site: siteName,
    title: title ? createTitleFromTemplate(title) : siteName,
    description: description || defaultDescription,
    images: [thumbnail || defaultArticleThumbnail],
  };
}

export function createTitleFromTemplate(title: string) {
  return `${title} | ${siteName}`;
}

export function createUrlFromSlug(slug: string) {
  return `https://homironi.com${slug}`;
}
