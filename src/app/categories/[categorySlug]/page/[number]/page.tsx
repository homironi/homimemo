import { ArticleListPageLayout } from "@/components/ArticleListPageLayout";
import { BreadcrumbElement } from "@/components/BreadCrumbs";
import {
  createCategoryListPagePath,
  createCategoryListPagePathBase,
  filterArticlesCategory,
  getPageLength
} from "@/lib/article";
import {
  getAllArticlesMeta,
  getAllCategories,
  getCategoryMetaFromSlug,
} from "@/lib/server/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { CategoryMeta } from "@/schemas/article/meta";
import type { Metadata } from "next";

type Params = {
  categorySlug: string;
  number: string;
};

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  const allArticles = getAllArticlesMeta();
  return getAllCategories()
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
  const rawParams = await params;
  const categorySlug = rawParams.categorySlug;
  const number = parseInt(rawParams.number);
  const meta = getCategoryMetaFromSlug(categorySlug);
  const title = createTitle(meta);
  const description = `${meta.name}の記事の一覧ページです。${
    meta.description ?? ""
  }`;

  return {
    title,
    description,
    openGraph: createDefaultOG(
      title,
      description,
      createCategoryListPagePath(meta, number)
    ),
    twitter: createDefaultTwitter(title, description),
  };
}

/**
 * カテゴリごとの記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function CategoriesArticlesPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const rawParams = await params;
  const number = parseInt(rawParams.number);
  const categoryMeta = getCategoryMetaFromSlug(rawParams.categorySlug);
  const articles = filterArticlesCategory(
    getAllArticlesMeta(),
    categoryMeta
  ).sort((a, b) => b.lastModDate.getTime() - a.lastModDate.getTime());
  const breadcrumbs: BreadcrumbElement[] = [
    {
      name: categoryMeta.name,
      href: createCategoryListPagePath(categoryMeta),
    },
  ];

  return (
    <ArticleListPageLayout
      breadcrumbs={ breadcrumbs }
      title={ createTitle(categoryMeta) }
      articles={ articles }
      listPagePathBase={ createCategoryListPagePathBase(categoryMeta) }
      currentPageNumber={ number }
    />
  );
}

function createTitle(categoryMeta: CategoryMeta) {
  return `${categoryMeta.name}の記事一覧`;
}
