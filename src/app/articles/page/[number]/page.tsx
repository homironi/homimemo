import {
  getPageLength
} from "@/lib/article";
import { getAllArticlesMeta } from "@/lib/server/article";
import type { Metadata } from "next";
import { ArticlesPage, generateArticlesPageMetadata } from "../../_components/ArticlesPage";

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
  const page = parseInt((await params).number);
  return generateArticlesPageMetadata(page);
}

/**
 * 記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params パラメータ
 * @returns 記事ページのJSX要素
 */
export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const page = parseInt((await params).number);

  return (
    <ArticlesPage page={ page } />
  );
}
