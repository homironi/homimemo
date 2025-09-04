import { ArticleLink } from "@/components/ArticleLink";
import { articlesListPagePath, createArticleDetailPath } from "@/lib/article";
import { formatDate } from "@/lib/date";
import { getAllArticlesMeta } from "@/lib/server/article";
import { createDefaultOG } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { JSX } from "react";
import styles from "./page.module.css";

const newArticlesCount = 10;

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @returns Meta情報
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      ...createDefaultOG(),
      type: "website",
    },
  };
}

/**
 * Homeページのコンポーネント
 * @returns HomeページのJSX要素
 */
export default function Home() {
  const latestArticles = getAllArticlesMeta()
    .sort((a, b) => {
      return b.publishDate.getTime() - a.publishDate.getTime();
    })
    .slice(0, newArticlesCount);
  return (
    <div className={styles.container}>
      <Changelog viewNum={4} />
      <h2 className={styles.title}>新着記事</h2>
      <ol className={styles.list}>
        {latestArticles.map((article) => {
          return (
            <li key={article.id} className={styles.item}>
              <time
                dateTime={formatDate(article.publishDate, "YYYY-MM-DD")}
                className={styles.time}
              >
                {formatDate(article.publishDate, "YYYY/MM/DD")}
              </time>
              <ArticleLink meta={article} />
            </li>
          );
        })}
      </ol>
      <Link href={articlesListPagePath} className={styles.more}>
        全記事一覧へ
      </Link>
    </div>
  );
}

type ChangelogProps = {
  viewNum: number;
};

type ChangelogData = {
  id: string;
  date: string;
  description: JSX.Element;
};

function Changelog({ viewNum }: ChangelogProps) {
  const allArticles: ChangelogData[] = getAllArticlesMeta()
    .map((article) => {
      const publishedDate = formatDate(article.publishDate, "YYYY-MM-DD");
      const modifiedDate = formatDate(article.lastModDate, "YYYY-MM-DD");
      // 公開日と更新日が同じ場合は更新履歴を出さない
      const isModified = publishedDate !== modifiedDate;

      let data: ChangelogData[] = [
        {
          id: `${article.id}-published`,
          date: publishedDate,
          description: (
            <>
              【記事公開】
              <a href={createArticleDetailPath(article.id)}>{article.title}</a>
            </>
          ),
        },
      ];

      if (isModified) {
        data.push({
          id: `${article.id}-modified`,
          date: modifiedDate,
          description: (
            <>
              【記事更新】
              <a href={createArticleDetailPath(article.id)}>{article.title}</a>
            </>
          ),
        });
      }

      return data;
    })
    .flat();

  const combinedChangelog: ChangelogData[] = [
    ...changelogData.map((item) => ({ ...item, id: crypto.randomUUID() })),
    ...allArticles,
  ]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, viewNum);

  return (
    <div>
      <h2 className={styles.title}>変更履歴</h2>
      <ol className={styles.list}>
        {combinedChangelog.map((log) => (
          <li key={log.id} className={styles.item}>
            <time dateTime={log.date}>{log.date.replace(/-/g, "/")}</time>：
            {log.description}
          </li>
        ))}
      </ol>
    </div>
  );
}

const changelogData: Omit<ChangelogData, "id">[] = [
  {
    date: "2025-09-03",
    description: <>サイトのホスティングをCloudflare Workersに変更しました</>,
  },
  {
    date: "2025-07-13",
    description: <>サイトをNext.jsを中心としたSSGにリニューアルしました</>,
  },
  {
    date: "2023-12-04",
    description: (
      <>
        ダークテーマ対応してみました。OSのテーマ設定に合わせて自動で切り替わります
      </>
    ),
  },
  {
    date: "2023-08-23",
    description: <a href="/articles/qnhckrrtrx8xv662s0ox840y/">サイト公開</a>,
  },
];
