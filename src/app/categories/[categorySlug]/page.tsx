import {
  getAllCategories
} from "@/lib/_buildtime/article";
import type { Metadata } from "next";
import { CategoryArticlesPage, generateCategoryArticlesPageMetadata } from "./_components/CategoryArticlesPage";

type Params = {
  categorySlug: string;
};

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  return getAllCategories()
    .map((category) => {
      return {
        categorySlug: category.slug,
      };
    });
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
  const { categorySlug } = await params;
  const page = 1;

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
  const { categorySlug } = await params;
  const page = 1;

  return (
    <CategoryArticlesPage page={ page } categorySlug={ categorySlug } />
  );
}
