import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticlesMeta } from "@/lib/server/article";
import type { Metadata } from "next";
import styles from "./page.module.css";

// 記事一覧の1ページあたりの表示件数
const perPage = 8;
const listPagePathBase = "/articles/page/";

type Params = {
  number: string;
};

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  const numbers = getPageLength(getAllArticlesMeta().length);
  return numbers.map(i => ({
    number: i.toString(),
  }));
}

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @returns Meta情報
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "記事一覧",
    description: "すべての記事の一覧ページです。",
  };
}

/**
 * 記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params 記事のIDを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function ArticlesPage({ params }: { params: Promise<Params> }) {
  const number = parseInt((await params).number);
  const startNum = perPage * (number - 1);
  const endNum = startNum + perPage;
  const articles = getAllArticlesMeta()
    .sort((a, b) => b.lastModDate.getTime() - a.lastModDate.getTime());
  const pageArticles = articles.slice(startNum, endNum);
  const pageNumbers = getPageLength(articles.length);

  return (
    <>
      <h1>記事一覧</h1>
      <p>{`全 ${articles.length} 件（${startNum + 1} 件目 ～ ${Math.min(endNum, articles.length)} 件目）`}</p>
      <ol className={ styles.list }>
        {pageArticles.map(article => (
          <li key={ article.id } className={ styles.item }>
            <ArticleCard meta={ article } />
          </li>
        ))}
      </ol>
      <ol>
        { pageNumbers.map(pageNumber => (
          <li key={ pageNumber }>
            <a href={ `${listPagePathBase}${pageNumber}/` }>{pageNumber == number ? `${pageNumber}：今ここ` : pageNumber}</a>
          </li>
        ))}
      </ol>
    </>
  );
}

/**
 * 記事の総数からページ番号の配列を生成する関数
 * @param length 記事の総数
 * @returns ページ番号の配列
 */
function getPageLength(length: number): number[] {
  const validLength = length <= 0 ? 1 : length;
  const pageLength = Math.ceil(validLength / perPage);
  return Array.from({ length: Math.ceil(pageLength) }, (_, i) => i + 1);
}
