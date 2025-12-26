import { createArticleDetailPath } from "@/lib/article";
import { getAllArticles } from "@/lib/collection";
import { defaultArticleThumbnail, siteName } from "@/lib/util";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

/**
 * RSSフィードの生成
 * @param context APIContext
 * @returns RSSフィードXML
 */
export async function GET(context: APIContext) {
  const articles = await getAllArticles();
  const siteOrigin = context.site;
  if(!siteOrigin) {
    throw new Error("Site origin is not defined in the context.");
  }

  const now =new Date();

  return rss({
    title: siteName,
    description: "ほみろにの新着情報",
    site: siteOrigin,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: new Date(article.data.publishDate),
      description: article.data.description,
      link: createArticleDetailPath(article.id),
      customData: `
        <enclosure url="${siteOrigin}${article.data.thumbnail || defaultArticleThumbnail}" length="0" type="image/webp" />
        <guid isPermaLink="false">${article.id}</guid>
      `,
    })),
    customData: `
    <language>ja</language>
    <copyright>© 2023-${now.getFullYear().toString()} homironi</copyright>
    <docs>https://cyber.harvard.edu/rss/</docs>
    <generator>https://docs.astro.build/ja/recipes/rss/</generator>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
    <image>
      <title>ほみろに</title>
      <url>https://homironi.com/images/logo.png</url>
      <link>https://homironi.com</link>
    </image>
    `,
  });
}