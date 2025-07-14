import {
  createArticleDetailPath,
  createArticleListPagePath,
  createCategoryListPagePath,
  createTagsPath,
  filterArticlesCategory,
  filterArticlesTag,
  getPageLength,
} from "@/lib/article";
import { getAllArticlesMeta, getAllCategories, getAllTags } from "@/lib/server/article";
import type { MetadataRoute } from "next";

const siteUrl = "https://homironi.com";

export const dynamic = "force-static";

/**
 * sitemap.xmlの生成
 * @returns サイトマップ
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const allArticles = getAllArticlesMeta();
  const articlePages: MetadataRoute.Sitemap = allArticles
    .map(article => ({
      url: `${siteUrl}${createArticleDetailPath(article.id)}`,
      lastModified: article.lastModDate,
      changeFrequency: "weekly",
    }));

  const articleListPages: MetadataRoute.Sitemap = getPageLength(allArticles.length)
    .map(i => ({
      url: `${siteUrl}${createArticleListPagePath(i + 1)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
    }));

  const categoryListPages: MetadataRoute.Sitemap = getAllCategories()
    .map<MetadataRoute.Sitemap>((category) => {
      return getPageLength(filterArticlesCategory(allArticles, category).length)
        .map(i => ({
          url: `${siteUrl}${createCategoryListPagePath(category, i)}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
        }));
    })
    .flat();

  const tagListPages: MetadataRoute.Sitemap = getAllTags()
    .map<MetadataRoute.Sitemap>((tag) => {
      return getPageLength(filterArticlesTag(allArticles, tag).length)
        .map(i => ({
          url: `${siteUrl}${createTagsPath(tag, i)}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
        }));
    })
    .flat();

  // TODO: 最終更新日の設定
  const otherPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${siteUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${siteUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${siteUrl}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
    {
      url: `${siteUrl}/disclaimer/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
    },
  ];

  return [
    ...otherPages,
    ...articlePages,
    ...articleListPages,
    ...categoryListPages,
    ...tagListPages,
  ];
}
