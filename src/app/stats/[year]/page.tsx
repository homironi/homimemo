import { getAllArticlesMeta, getAllTags } from "@/lib/_buildtime/article";
import { createArticleDetailPath, createTagListPagePath, filterArticlesTag } from "@/lib/article";
import { formatDate } from "@/lib/date";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { ArticleRatioList, ArticleRatioListProps } from "../_components/ArticleRatioList";

type Props = PageProps<"/stats/[year]">;

/**
 * 統計ページのメタデータを生成する関数
 * @param props 引数オブジェクト
 * @returns 統計ページのメタデータ
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { year } = await props.params;
  const title = `${year}年のサイト統計`;
  const description = `${year}年のサイトのデータをまとめたページです。`;
  return {
    title,
    description,
    openGraph: {
      ...createDefaultOG(
        title,
        description,
        `/stats/${year}/`,
      ),
      type: "website",
    },
    twitter: createDefaultTwitter(title, description),
  };
}

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(){
  const existYears = [...(new Set(getAllArticlesMeta().map(article => article.publishDate.getFullYear()).sort((a, b) => a - b)))];
  return existYears.map(year => ({ year: year.toString()}));
}

/**
 * 統計ページComponent
 * @param props 引数オブジェクト
 * @returns 統計ページ
 */
export default async function Page(props: Props){
  const { year:yearStr } = await props.params;
  const year = parseInt(yearStr);
  const allArticles = getAllArticlesMeta();
  const yearArticles = allArticles.filter(article => article.publishDate.getFullYear() === year);
  const articlesByMonth = Object.entries(Object.groupBy(yearArticles.toSorted((a, b) => a.publishDate.getTime() - b.publishDate.getTime()), article => article.publishDate.getMonth() + 1 ));

  const tagsRatioListData : ArticleRatioListProps["list"] = getAllTags()
    .map(tag=>{
      const filteredArticlesNum = filterArticlesTag(yearArticles, tag).length;
      return {
        tag: tag,
        length: filteredArticlesNum,
      };})
    .filter(v => v.length >= 1)
    .sort((a, b)=> b.length - a.length)
    .map(({tag, length})=>{
      return {
        key : tag.slug,
        allArticlesLength: yearArticles.length,
        length: length,
        href: createTagListPagePath(tag),
        name :  tag.name,
      };
    });

  const now = new Date();

  return (
    <>
      <h1>🎉サイト統計 {year}年🎉</h1>
      <time dateTime={ formatDate(now, "YYYY-MM-DD") }>{formatDate(now, "YYYY/MM/DD")}現在</time>
      <h2>{year}年の記事数</h2>
      <p>{yearArticles.length} 件</p>
      <p>なんと全ての年の記事{allArticles.length}件のうち、{Math.round(yearArticles.length / allArticles.length * 100 * 10) / 10} %が{year}年に書かれました！</p>
      <h2>{year}年のタグごとの記事数</h2>
      <ArticleRatioList list={ tagsRatioListData } />
      <h2>{year}年の記事</h2>
      <div>
        {articlesByMonth.map(v => {
          const month = v[0];
          const articles = v[1];
          return (
            <details key={ month }>
              <summary>{month}：{articles?.length}件</summary>
              <ul>
                {articles?.map(meta => <li key={ meta.id }><Link href={ createArticleDetailPath(meta.id) }>{meta.title}</Link></li>)}
              </ul>
            </details>
          );
        })}
      </div>
    </>
  );
}
