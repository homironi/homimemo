import {
  filterArticlesCategory,
  getPageLength
} from "@/lib/article";
import {
  getAllArticlesMeta,
  getAllCategories
} from "@/lib/server/article";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryArticlesPage, generateCategoryArticlesPageMetadata } from "../../_components/CategoryArticlesPage";

type Params = {
  categorySlug: string;
  number: string;
};

const dummy : Params = { categorySlug: "__dummy__", number: "1" };

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  const allArticles = getAllArticlesMeta();
  const all = getAllCategories()
    .map((category) => {
      // 1ページ目は「categories/[slug]/」にするのでここでは生成しない
      return getPageLength(
        filterArticlesCategory(allArticles, category).length
      ).filter(i => i !== 1).map((i) => ({
        categorySlug: category.slug,
        number: i.toString(),
      }));
    })
    .flat();
  
  // 一件もページがない場合でも、空配列を返さない
  // 空配列になると、ビルド時に「missing "generateStaticParams()"」のエラーが出てしまうため
  if (all.length === 0) {
    // ダミーを1件返して、構造だけ維持
    return [dummy];
  }

    return all;
}

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns Meta情報
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { number,categorySlug } = await params;
  const page = parseInt(number);

  return generateCategoryArticlesPageMetadata(page, categorySlug);
}

/**
 * カテゴリごとの記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { number,categorySlug } = await params;
  if(categorySlug === dummy.categorySlug){
    notFound();
  }
  
  const page = parseInt(number);

  return (
    <CategoryArticlesPage page={ page } categorySlug={ categorySlug } />
  );
}
