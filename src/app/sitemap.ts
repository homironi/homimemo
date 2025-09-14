import {
  createArticleDetailPath,
  createArticleListPagePath,
  createCategoryListPagePath,
  createTagsPath,
  filterArticlesCategory,
  filterArticlesTag,
  getPageLength,
} from "@/lib/article";
import {
  getAllArticlesMeta,
  getAllCategories,
  getAllTags,
  readStaticArticleContent,
} from "@/lib/server/article";
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

  const categoryListPages: MetadataRoute.Sitemap = getAllCategories()
    .map<MetadataRoute.Sitemap>((category) => {
      const filteredArticles = filterArticlesCategory(allArticles, category);
      const sorted = filteredArticles
        .toSorted((a, b)=> b.lastModDate.getTime() - a.lastModDate.getTime());
      return getPageLength(filteredArticles.length)
        .map((i) => ({
          url: `${siteOrigin}${createCategoryListPagePath(category, i)}`,
          lastModified: sorted.length > 0 ? sorted[0].lastModDate : undefined,
        }));
    })
    .flat();

  const tagListPages: MetadataRoute.Sitemap = getAllTags()
    .map<MetadataRoute.Sitemap>((tag) => {
      const filteredArticles = filterArticlesTag(allArticles, tag);
      const sorted = filteredArticles
        .toSorted((a, b)=> b.lastModDate.getTime() - a.lastModDate.getTime());
      return getPageLength(filteredArticles.length).map(
        (i) => ({
          url: `${siteOrigin}${createTagsPath(tag, i)}`,
          lastModified: sorted.length > 0 ? sorted[0].lastModDate : undefined,
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
  ];

  return [
    ...otherPages,
    ...staticArticles,
    ...articlePages,
    ...articleListPages,
    ...categoryListPages,
    ...tagListPages,
  ];
}
