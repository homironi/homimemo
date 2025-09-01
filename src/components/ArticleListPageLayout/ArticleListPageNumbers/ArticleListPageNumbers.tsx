import { getPageLength as getPageNumbers } from "@/lib/article";
import styles from "./ArticleListPageNumbers.module.css";

export type ArticleListPageNumbersProps = {
  listPagePathBase: string;
  currentPageNumber: number;
  allArticlesLength: number;
};

/**
 * 記事リストページのページ番号表示要素
 * @param root0 引数オブジェクト
 * @param root0.listPagePathBase リストページのパスのベース
 * @param root0.currentPageNumber 現在のページの番号
 * @param root0.allArticlesLength 対象の全記事件数
 * @returns ページ番号要素
 */
export function ArticleListPageNumbers({
  listPagePathBase,
  currentPageNumber,
  allArticlesLength,
}: ArticleListPageNumbersProps) {
  const pageNumbers = getPageNumbers(allArticlesLength);
  if (pageNumbers.length === 0) {
    pageNumbers.push(currentPageNumber);
  }

  return (
    <ol className={styles.list}>
      {pageNumbers.map((pageNumber) => {
        const linkPathBase = listPagePathBase.endsWith("/")
          ? listPagePathBase
          : `${listPagePathBase}/`;
        const linkPath = `${linkPathBase}${pageNumber}`;
        const isCurrent = pageNumber == currentPageNumber;

        return (
          <li
            key={pageNumber}
            className={isCurrent ? styles["items-current"] : styles.items}
          >
            <a
              href={linkPath}
              className={isCurrent ? styles["link-current"] : styles.link}
            >
              {pageNumber}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
