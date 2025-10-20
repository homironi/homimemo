import { HomironiStampIcon } from "@/assets/icons";
import { getAllArticlesMeta, getAllCategories, getAllTags } from "@/lib/_buildtime/article";
import { createCategoryListPagePath, createTagListPagePath, filterArticlesCategory, filterArticlesTag } from "@/lib/article";
import { formatDate } from "@/lib/date";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { Metadata } from "next";
import { Archive, createArchiveByYear } from "./_components/Archive";
import { ArticleRatioList, ArticleRatioListProps } from "./_components/ArticleRatioList";
import styles from "./page.module.css";

const title = "サイト統計";
const description = "サイトのデータをまとめたページです。";

/**
 * 統計ページのメタデータを生成する関数
 * @returns 統計ページのメタデータ
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    openGraph: {
      ...createDefaultOG(
        title,
        description,
        "/stats/",
      ),
      type: "website",
    },
    twitter: createDefaultTwitter(title, description),
  };
}

/**
 * 統計ページComponent
 * @returns 統計ページ
 */
export default function Page(){
  const articles = getAllArticlesMeta();
  const articlesLength = articles.length;
  const archive = createArchiveByYear(articles);

  const categoriesRatioListData : ArticleRatioListProps["list"] = getAllCategories()
    .map(category=>{
      const filteredArticles = filterArticlesCategory(articles, category).length;
      return {
        category,
        length: filteredArticles,
      };})
    .sort((a, b)=> b.length - a.length)
    .map(({category, length})=>{
      return {
        key : category.slug,
        allArticlesLength: articlesLength,
        length: length,
        href: createCategoryListPagePath(category),
        name :  category.name,
      };
    });

  const tagsRatioListData : ArticleRatioListProps["list"] = getAllTags()
    .map(tag=>{
      const filteredArticles = filterArticlesTag(articles, tag).length;
      return {
        tag: tag,
        length: filteredArticles,
      };})
    .sort((a, b)=> b.length - a.length)
    .map(({tag, length})=>{
      return {
        key : tag.slug,
        allArticlesLength: articlesLength,
        length: length,
        href: createTagListPagePath(tag),
        name :  tag.name,
      };
    });

    const now = new Date();

  return (
    <div className={ styles.container }>
      <h1>🎉サイト統計🎉</h1>
      <time dateTime={ formatDate(now, "YYYY-MM-DD") }>{formatDate(now, "YYYY/MM/DD")}現在</time>
      <h2>サイト公開日</h2>
      <div className={ styles["date-container"] }>
        <HomironiStampIcon className={ styles["date-icon"] }/>
        <p className={ styles.date }>2023/08/23</p>
      </div>
      <h2>全記事数</h2>
      <p>{articlesLength}件</p>
      <h2>年ごとの記事数</h2>
      <Archive archive={ archive } />
      <h2>カテゴリごとの記事数</h2>
      <ArticleRatioList list={ categoriesRatioListData } />
      <h2>タグごとの記事数</h2>
      <ArticleRatioList list={ tagsRatioListData } />
    </div>
  );
}
