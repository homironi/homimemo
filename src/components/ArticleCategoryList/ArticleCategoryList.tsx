import { createCategoryListPagePath } from "@/lib/article";
import { CategoryMeta } from "@/schemas/article/meta";
import Link from "next/link";
import styles from "./ArticleCategoryList.module.css";

/**
 * カテゴリの一覧を表示するコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.categories カテゴリのメタ情報の配列
 * @returns カテゴリの一覧を表示するコンポーネント
 */
export function ArticleCategoryList({
  categories,
}: {
  categories: CategoryMeta[];
}) {
  return (
    <div className={ styles.container }>
      <p>カテゴリ一覧</p>
      <ul className={ styles.list }>
        {categories.map((category) => (
          <li key={ category.slug } className={ styles.item }>
            <Link
              href={ createCategoryListPagePath(category) }
              className={ styles.link }
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
