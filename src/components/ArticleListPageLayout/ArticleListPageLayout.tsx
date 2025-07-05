import { ArticleCard } from "@/components/ArticleCard";
import { BreadcrumbElement, Breadcrumbs } from "@/components/BreadCrumbs";
import { articlePagePerNum } from "@/lib/article";
import { ArticleMeta } from "@/schemas/article/meta";
import styles from "./ArticleListPageLayout.module.css";
import { ArticleListPageNumbers } from "./ArticleListPageNumbers";

export type ArticleListLayoutProps = {
  breadcrumbs: BreadcrumbElement[];
  title: string;
  articles: ArticleMeta[];
  listPagePathBase: string;
  currentPageNumber: number;
};

/**
 * 記事リストのレイアウトまでされている要素
 * @param root0 引数オブジェクト
 * @param root0.breadcrumbs パンくずリストデータ
 * @param root0.title タイトル
 * @param root0.listPagePathBase リストページのパスのベース
 * @param root0.currentPageNumber 現在のページの番号
 * @param root0.articles 対象の全記事
 * @returns 記事リストのレイアウト付き要素
 */
export function ArticleListPageLayout({
  breadcrumbs,
  title,
  articles,
  listPagePathBase,
  currentPageNumber,
}: ArticleListLayoutProps) {
  const startNum = articlePagePerNum * (currentPageNumber - 1);
  const endNum = startNum + articlePagePerNum;
  const pageArticles = articles.slice(startNum, endNum);

  return (
    <div className={ styles.container }>
      <Breadcrumbs breadcrumbs={ breadcrumbs } />
      <h1>{ title }</h1>
      {articles.length === 0
        ? <p>記事は見つかりませんでした。</p>
        : (
            <>
              <p>{`全 ${articles.length} 件（${startNum + 1} 件目 ～ ${Math.min(endNum, articles.length)} 件目）`}</p>
              <ol className={ styles.list }>
                {pageArticles.map(article => (
                  <li key={ article.id } className={ styles.item }>
                    <ArticleCard meta={ article } />
                  </li>
                ))}
              </ol>
              <ArticleListPageNumbers
                allArticlesLength={ articles.length }
                listPagePathBase={ listPagePathBase }
                currentPageNumber={ currentPageNumber }
              />
            </>
          )}
    </div>
  );
}
