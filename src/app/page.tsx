import { articlesListPagePath, createArticleDetailPath } from "@/lib/article";
import { formatDate } from "@/lib/date";
import { getAllArticlesMeta } from "@/lib/server/article";
import Link from "next/link";
import styles from "./page.module.css";

const newArticlesCount = 10;

/**
 * Homeページのコンポーネント
 * @returns HomeページのJSX要素
 */
export default function Home() {
  const newArticles = getAllArticlesMeta()
    .sort((a, b) => {
      return b.publishDate.getTime() - a.publishDate.getTime();
    })
    .slice(0, newArticlesCount);
  return (
    <div>
      <h2 className={ styles.title }>新着記事</h2>
      <ol className={ styles.list }>
        {newArticles.map((article) => {
          return (
            <li
              key={ article.id }
              className={ styles.item }
            >
              <time
                dateTime={ formatDate(article.publishDate, "YYYY-MM-DD") }
                className={ styles.time }
              >
                {formatDate(article.publishDate, "YYYY/MM/DD")}
              </time>
              <a href={ createArticleDetailPath(article.id) }>{article.title}</a>
            </li>
          );
        })}
      </ol>
      <Link href={ articlesListPagePath } className={ styles.more }>全記事一覧へ</Link>
    </div>
  );
}
