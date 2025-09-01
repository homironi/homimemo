import { createTagsPath } from "@/lib/article";
import { TagMeta } from "@/schemas/article/meta";
import Link from "next/link";
import styles from "./ArticleTagList.module.css";

/**
 * タグの一覧を表示するコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.tags タグのメタ情報の配列
 * @returns タグの一覧を表示するコンポーネント
 */
export function ArticleTagList({ tags }: { tags: TagMeta[] }) {
  return (
    <div className={styles.container}>
      <p>タグ一覧</p>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag.slug} className={styles.item}>
            <Link href={createTagsPath(tag)} className={styles.link}>
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
