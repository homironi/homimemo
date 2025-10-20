import { ArticleListPageLayout } from "@/components/ArticleListPageLayout";
import { BreadcrumbElement } from "@/components/BreadCrumbs";
import {
  getAllArticlesMeta,
  getCategoryMetaFromSlug
} from "@/lib/_buildtime/article";
import {
  createCategoryListPagePath,
  createCategoryListPagePathBase,
  filterArticlesCategory
} from "@/lib/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { CategoryMeta } from "@/schemas/article/meta";
import type { Metadata } from "next";

/**
 * Next.jsのページで使用するCategoryArticlesPage用の静的Meta情報の生成
 * @param page ページ番号
 * @param categorySlug カテゴリSlug
 * @returns Meta情報
 */
export async function generateCategoryArticlesPageMetadata(page : number, categorySlug : string): Promise<Metadata> {
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
      createCategoryListPagePath(meta, page)
    ),
    twitter: createDefaultTwitter(title, description),
  };
}

type CategoriesArticlesPageProps = {
  page : number;
  categorySlug : string;
};

/**
 * カテゴリごとの記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.page ページ番号
 * @param root0.categorySlug カテゴリSlug
 * @returns 記事ページのJSX要素
 */
export function CategoryArticlesPage({ page, categorySlug } : CategoriesArticlesPageProps) {
  const categoryMeta = getCategoryMetaFromSlug(categorySlug);
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
      currentPageNumber={ page }
      firstPagePath={ createCategoryListPagePath(categoryMeta,1) }
    />
  );
}

function createTitle(categoryMeta: CategoryMeta) {
  return `${categoryMeta.name}の記事一覧`;
}
