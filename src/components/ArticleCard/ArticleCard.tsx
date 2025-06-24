import { CategoryIcon, LastModeDateIcon, PublishDateIcon } from "@/assets/google-materials";
import { articleThumbnailNativeSize, createArticleDetailPath, defaultArticleThumbnail } from "@/lib/article";
import { ArticleMeta } from "@/schemas/article/meta";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleCard.module.css";

export type ArticleCardProps = {
  meta: ArticleMeta;
};

/**
 * 記事のカードコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.meta 記事のメタデータ
 * @returns 記事カードのJSX要素
 */
export function ArticleCard({ meta }: ArticleCardProps) {
  const publishDate = meta.publishDate.toLocaleDateString();
  const lastModDate = meta.lastModDate.toLocaleDateString();
  return (
    <div className={ styles.container }>
      <Link
        href={ createArticleDetailPath(meta.id) }
        className={ styles.link }
      >
        <Image
          src={ meta.thumbnail ?? defaultArticleThumbnail }
          alt={ meta.title }
          width={ articleThumbnailNativeSize.width }
          height={ articleThumbnailNativeSize.height }
        />
        <div className={ styles["text-container"] }>
          <span className={ styles.category }>
            <CategoryIcon className={ styles.icon } />
            { meta.category.name}
          </span>
          <h2 className={ styles.title }>{meta.title}</h2>
          <div className={ styles["date-container"] }>
            {lastModDate !== publishDate && (
              <span className={ styles["last-mod-date"] }>
                <LastModeDateIcon className={ styles.icon } />
                <time dateTime={ meta.lastModDate.toLocaleDateString() }>{ lastModDate }</time>
              </span>
            )}
            <span>
              <PublishDateIcon className={ styles.icon } />
              <time dateTime={ meta.publishDate.toLocaleDateString() }>{ publishDate }</time>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
