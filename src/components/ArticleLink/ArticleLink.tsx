import {
  CategoryIcon,
  LastModeDateIcon,
  PublishDateIcon,
} from "@/assets/icons";
import {
  articleThumbnailNativeSize,
  createArticleDetailPath,
  defaultArticleThumbnail,
} from "@/lib/article";
import { formatDate } from "@/lib/date";
import { ArticleMeta } from "@/schemas/article/meta";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleLink.module.css";

export type ArticleLinkProps = {
  meta: ArticleMeta;
};

/**
 * 記事のリンクコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.meta 記事のメタデータ
 * @returns 記事リンクのJSX要素
 */
export function ArticleLink({ meta }: ArticleLinkProps) {
  const publishDate = formatDate(meta.publishDate, "YYYY/MM/DD");
  const lastModDate = formatDate(meta.lastModDate, "YYYY/MM/DD");
  return (
    <div className={ styles.container }>
      <Link href={ createArticleDetailPath(meta.id) } className={ styles.link }>
        <div className={ styles["image-container"] }>
          <div className={ styles["image-container-2"] }>
            <Image
              src={ meta.thumbnail ?? defaultArticleThumbnail }
              alt={ meta.title }
              width={ articleThumbnailNativeSize.width }
              height={ articleThumbnailNativeSize.height }
              className={ styles.image }
            />
          </div>
        </div>
        <div className={ styles["text-container"] }>
          <span className={ styles.category }>
            <CategoryIcon className={ styles.icon } />
            {meta.category.name}
          </span>
          <div className={ styles.title }>{meta.title}</div>
          <div className={ styles.description }>{meta.description}</div>
          <div className={ styles["date-container"] }>
            {lastModDate !== publishDate && (
              <span>
                <LastModeDateIcon className={ styles.icon } />
                <time dateTime={ formatDate(meta.lastModDate, "YYYY-MM-DD") }>
                  {lastModDate}
                </time>
              </span>
            )}
            <span>
              <PublishDateIcon className={ styles.icon } />
              <time dateTime={ formatDate(meta.publishDate, "YYYY-MM-DD") }>
                {publishDate}
              </time>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
