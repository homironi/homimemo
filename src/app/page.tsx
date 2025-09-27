import { ArticleLink } from "@/components/ArticleLink";
import { noticeData } from "@/data/notice";
import { recommendedArticles } from "@/data/recommendedArticle";
import { articlesListPagePath, createArticleDetailPath } from "@/lib/article";
import { formatDate } from "@/lib/date";
import { getAllArticlesMeta } from "@/lib/server/article";
import { createDefaultOG } from "@/lib/utils";
import { ArticleMeta } from "@/schemas/article/meta";
import { Metadata } from "next";
import Link from "next/link";
import { JSX } from "react";
import styles from "./page.module.css";

const noticeMax = 2;
const recommendedArticleMax = 4;
const newArticlesMax = 10;

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
  return (
    <div className={ styles.container }>
      <List title="お知らせ" data={ notices } />
      <List title="更新履歴" data={ articlesChangelog } />
      <List title="おすすめ" data={ recommendedArticlesList } />
      <List title="新着記事" data={ latestArticles } />
      <Link href={ articlesListPagePath } className={ styles.more }>
        全記事一覧へ
      </Link>
    </div>
  );
}

type ListElement = {
  key:string,
  item:JSX.Element
};

type ListProps = {
  title : string;
  data : ListElement[]
};

function List({title, data}:ListProps){
  return(
  <>
    <h2 className={ styles.title }>{title}</h2>
    <ol className={ styles.list }>
      {data.map(({key, item})=> (
        <li key={ key } className={ styles.item }>
          {item}
        </li>
      ))}
    </ol>
  </>);
}

const notices = noticeData
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, noticeMax)
  .map((item) => ({
    key: crypto.randomUUID(),
    item: (<>
      <time dateTime={ item.date }>{item.date.replace(/-/g, "/")}</time>：
      {item.description}
    </>)
  }));

const allArticles = getAllArticlesMeta();

type ArticleLinkItemProps = {
  article: ArticleMeta,
};

function ArticleLinkItem({article}:ArticleLinkItemProps){
  return (
    <>
      <time
        dateTime={ formatDate(article.publishDate, "YYYY-MM-DD") }
        className={ styles.time }
      >
        {formatDate(article.publishDate, "YYYY/MM/DD")}
      </time>
      <ArticleLink meta={ article } />
    </>
  );
}

const recommendedArticlesList : ListElement[] = recommendedArticles
  .slice(0, recommendedArticleMax)
  .map(article => ({
    key:article.id,
    item: <ArticleLinkItem article={ article } />
  }
));

const latestArticles : ListElement[] = allArticles
  .sort((a, b) => {
    return b.publishDate.getTime() - a.publishDate.getTime();
  })
  .slice(0, newArticlesMax)
  .map(article=>{
    return {
      key: article.id,
      item: (<ArticleLinkItem article={ article } />),
    };
  });

const articlesChangelog: ListElement[] = allArticles
  .sort((a, b) => {
    return b.lastModDate.getTime() - a.lastModDate.getTime();
  })
  .map((article) => {
    const publishedDate = formatDate(article.publishDate, "YYYY-MM-DD");
    const modifiedDate = formatDate(article.lastModDate, "YYYY-MM-DD");
    // 公開日と更新日が同じ場合は更新していない扱い
    const isModified = publishedDate !== modifiedDate;

    const data = [
      {
        date: article.publishDate.getTime(),
        key: `${article.id}-published`,
        item: (
          <>
            <time dateTime={ publishedDate }>{formatDate(article.publishDate, "YYYY/MM/DD")}</time>：
            【記事公開】
            <a href={ createArticleDetailPath(article.id) }>{article.title}</a>
          </>
        ),
      },
    ];

    if (isModified) {
      data.push({
        date: article.lastModDate.getTime(),
        key: `${article.id}-modified`,
        item: (
          <>
            <time dateTime={ modifiedDate }>{formatDate(article.lastModDate, "YYYY/MM/DD")}</time>：
            【記事更新】
            <a href={ createArticleDetailPath(article.id) }>{article.title}</a>
          </>
        ),
      });
    }

    return data;
  })
  .flat()
  .sort((a, b) => b.date - a.date)
  .slice(0, 4);
