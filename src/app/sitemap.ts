import {
  getAllArticlesMeta,
  getAllTags,
  readStaticArticleContent
} from "@/lib/_buildtime/article";
import {
  createArticleDetailPath,
  createArticleListPagePath,
  createTagListPagePath,
  filterArticlesTag,
  getPageLength
} from "@/lib/article";
import { siteOrigin } from "@/lib/utils";
import fs from "fs";
import type { MetadataRoute } from "next";
import path from "path";

export const dynamic = "force-static";

const staticArticlesDirectory = path.join("_contents", "static-articles");

/**
 * sitemap.xmlの生成
 * @returns サイトマップ
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const allArticles = getAllArticlesMeta();
  const articlePages: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${siteOrigin}${createArticleDetailPath(article.id)}`,
    lastModified: article.lastModDate,
  }));

  const articleListPages: MetadataRoute.Sitemap = getPageLength(allArticles.length)
    .map((i) => ({
      url: `${siteOrigin}${createArticleListPagePath(i)}`,
    }));

  const tagListPages: MetadataRoute.Sitemap = getAllTags()
    .map<MetadataRoute.Sitemap>((tag) => {
      return getPageLength(filterArticlesTag(allArticles, tag).length).map(
        (i) => ({
          url: `${siteOrigin}${createTagListPagePath(tag, i)}`,
        })
      );
    })
    .flat();

  const staticArticles: MetadataRoute.Sitemap = 
    fs.readdirSync(staticArticlesDirectory)
    .map(fileName => {
      const filePath = path.join(staticArticlesDirectory, fileName);
      const { meta } = readStaticArticleContent(filePath);
      return {
        url: `${siteOrigin}/${meta.slug}/`,
        lastModified: meta.lastModDate,
      };
    });

  const otherPages: MetadataRoute.Sitemap = [
    {
      url: `${siteOrigin}/`,
    },
    {
      url: `${siteOrigin}/stats/`,
    },
  ];

  return [
    ...otherPages,
    ...staticArticles,
    ...articlePages,
    ...articleListPages,
    ...tagListPages,
  ];
}
