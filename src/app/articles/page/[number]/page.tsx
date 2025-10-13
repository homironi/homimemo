import { ArticleListPageLayout } from "@/components/ArticleListPageLayout";
import { BreadcrumbElement } from "@/components/BreadCrumbs";
import {
  articleListPagePathBase,
  articlesListPagePath,
  createArticleListPagePath,
  getPageLength,
} from "@/lib/article";
import { getAllArticlesMeta } from "@/lib/server/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import type { Metadata } from "next";

const title = "記事一覧";

type Params = {
  number: string;
};

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  const numbers = getPageLength(getAllArticlesMeta().length);
  return numbers
    .filter(num=> num !== 1) // 1ページ目は「/articles/」にするのでこちらではページを生成しない
    .map((i) => ({
      number: i.toString(),
    }));
}

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @param root0 引数オブジェクト
 * @param root0.params 静的パラメータ
 * @returns Meta情報
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const number = parseInt((await params).number);
  const description = `すべての記事一覧の${number}ページ目です。`;
  return {
    title,
    description,
    openGraph: createDefaultOG(
      title,
      description,
      createArticleListPagePath(number)
    ),
    twitter: createDefaultTwitter(title, description),
  };
}

/**
 * 記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params 記事のIDを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function ArticlesPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const number = parseInt((await params).number);
  const articles = getAllArticlesMeta().sort(
    (a, b) => b.lastModDate.getTime() - a.lastModDate.getTime()
  );
  const breadcrumbs: BreadcrumbElement[] = [
    {
      name: title,
      href: articlesListPagePath,
    },
  ];

  return (
    <ArticleListPageLayout
      breadcrumbs={ breadcrumbs }
      title={ title }
      articles={ articles }
      listPagePathBase={ articleListPagePathBase }
      currentPageNumber={ number }
      firstPagePath={ articlesListPagePath }
    />
  );
}
