import { ArticleListPageLayout } from "@/components/ArticleListPageLayout";
import { getPageLength } from "@/lib/article/listPage";
import { getAllArticlesMeta } from "@/lib/server/article";
import type { Metadata } from "next";

const title = "記事一覧";
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
    title: title,
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
  const articles = getAllArticlesMeta()
    .sort((a, b) => b.lastModDate.getTime() - a.lastModDate.getTime());

  return (
    <ArticleListPageLayout
      title={ title }
      articles={ articles }
      listPagePathBase={ listPagePathBase }
      currentPageNumber={ number }
    />
  );
}
