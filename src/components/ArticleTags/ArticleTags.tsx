import { LabelIcon } from "@/assets/icons";
import { createTagsPath } from "@/lib/article";
import { TagMeta } from "@/schemas/article/meta";
import Link from "next/link";
import styles from "./ArticleTags.module.css";

export type ArticleTagsProps = {
  tags: TagMeta[];
};

/**
 * 記事のタグの表示
 * @param root0 引数オブジェクト
 * @param root0.tags タグ情報の配列
 * @returns 記事のタグ表示要素
 */
export function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <>
      <LabelIcon className={ styles.icon } />
      {tags.length > 0 ? (
        <ul className={ styles.list }>
          {tags.map((tag) => (
            <li key={ tag.slug }>
              <Link
                href={ createTagsPath(tag) }
                key={ tag.slug }
                className={ styles.link }
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <span className={ styles.empty }>no tag</span>
      )}
    </>
  );
}
