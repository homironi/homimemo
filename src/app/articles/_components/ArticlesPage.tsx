import { ArticleListPageLayout } from "@/components/ArticleListPageLayout";
import { BreadcrumbElement } from "@/components/BreadCrumbs";
import { getAllArticlesMeta } from "@/lib/_buildtime/article";
import { articleListPagePathBase, articlesListPagePath, createArticleListPagePath } from "@/lib/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { Metadata } from "next";

const title = "記事一覧";

/**
 * 全記事一覧ページで使用する静的Meta情報の生成
 * @param page ページ番号
 * @returns 全記事一覧ページで使用する静的Meta情報
 */
export async function generateArticlesPageMetadata(page : number): Promise<Metadata> {
  const description = `すべての記事一覧の${page}ページ目です。`;
  return {
    title,
    description,
    openGraph: createDefaultOG(
      title,
      description,
      createArticleListPagePath(page)
    ),
    twitter: createDefaultTwitter(title, description),
  };
}

type ArticlesPageProps = {
  page : number;
};

/**
 * 記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.page ページ番号
 * @returns 記事ページのJSX要素
 */
export function ArticlesPage({page}:ArticlesPageProps) {
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
      currentPageNumber={ page }
      firstPagePath={ articlesListPagePath }
    />
  );
}
