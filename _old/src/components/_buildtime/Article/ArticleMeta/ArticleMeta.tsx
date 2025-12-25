import { ArticleIcon, LastModeDateIcon, MenuBookIcon, PublishDateIcon } from "@/assets/icons";
import { ArticleTags } from "@/components/ArticleTags";
import { ArticleComponentMeta } from "@/components/_buildtime/Article";
import { formatDate } from "@/lib/date";
import { isArticleMeta } from "@/schemas/article/meta";
import styles from "./ArticleMeta.module.css";

export type ArticleMetaProps = {
  meta : ArticleComponentMeta;
  contentLength : number;
};

/**
 * 記事のmetaを表示する要素
 * @param root0 引数オブジェクト
 * @param root0.meta 記事のmeta
 * @param root0.contentLength 記事本文の文字数
 * @returns 記事のmetaを表示する要素
 */
export function ArticleMeta({ meta, contentLength }:ArticleMetaProps){
  // 通常の記事化どうか：falseなら固定記事（aboutやcontact）
  const isArticle = isArticleMeta(meta);

  const publishDateText = formatDate(meta.publishDate, "YYYY/MM/DD");
  const lastModDateText = formatDate(meta.lastModDate, "YYYY/MM/DD");
  const readPerMinutes = 400;
  const readTime = Math.round(contentLength / readPerMinutes);

  return (
    <div className={ styles.container }>
      <div className={ styles["date-container"] }>
        <span>
          <PublishDateIcon className={ styles.icon } />
          <time dateTime={ formatDate(meta.publishDate, "YYYY-MM-DD") }>
            {publishDateText}
          </time>
        </span>
        {/* 日付が違う時だけ更新があったとして更新日時を表示する。同じ日の場合は表示しない */}
        {publishDateText !== lastModDateText && (
          <span>
            <LastModeDateIcon className={ styles.icon } />
            <time dateTime={ formatDate(meta.lastModDate, "YYYY-MM-DD") }>
              {lastModDateText}
            </time>
          </span>
        )}
      </div>
      {isArticle && meta.tags && <ArticleTags tags={ meta.tags } />}
      <p className={ styles.text }><ArticleIcon className={ styles.icon }/>{contentLength} 文字</p>
      <p className={ styles.text }><MenuBookIcon className={ styles.icon }/>{` ${readTime} 分（${readPerMinutes} 文字 / 分）`}</p>
    </div>
  );
}