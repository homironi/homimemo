import type { ArticleMeta, StaticPageMetaWithSlug } from "@/schemas/article/meta";
import type { Person, TechArticle, WebPage, WithContext } from "schema-dts";

export const author : Person = {
  "@type": "Person",
  name: "homi",
  alternateName: "homironi",
  image: [`${import.meta.env.SITE}/images/profile.webp`],
  url: `${import.meta.env.SITE}/profile/`
};

/**
 * Json-LD形式の記事データを作成する
 * @param meta 記事のMeta情報
 * @returns Json-LD形式の記事データ
 */
export function createArticleJsonLd(meta:ArticleMeta):WithContext<TechArticle>{
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    author: author,
    dateModified: meta.lastModDate.toISOString(),
    datePublished: meta.publishDate.toISOString(),
    headline: meta.title,
    image: meta.thumbnail ? `${import.meta.env.SITE}${meta.thumbnail}` : undefined,
  };
}


const staticArticleJsonLdMap = new Map<string, Omit<WithContext<WebPage>, "@context">>([
  ["about", {
    "@type": "AboutPage",
  }],
  ["profile", {
    "@type": "ProfilePage",
    mainEntity: author,
  }],
  ["contact", {
    "@type": "ContactPage",
  }],
]);

/**
 * Json-LD形式の静的記事データを作成する
 * @param meta 静的記事のMeta情報
 * @returns Json-LD形式の静的記事データ
 */
export function createStaticArticleJsonLd(meta: StaticPageMetaWithSlug): WithContext<WebPage>{
  const data:Omit<WithContext<WebPage>, "@context"> = staticArticleJsonLdMap.get(meta.slug)
    ?? {
    "@type": "WebPage",
  };

  return {
    ...data,
    "@context": "https://schema.org",
    dateCreated: meta.publishDate.toISOString(),
    dateModified: meta.lastModDate.toISOString(),
  };
}
