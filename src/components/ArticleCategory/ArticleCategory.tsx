import { CategoryIcon } from "@/assets/icons";
import { createCategoryListFirstPagePath } from "@/lib/article";
import { CategoryMeta } from "@/schemas/article/meta";
import Link from "next/link";
import styles from "./ArticleCategory.module.css";

export type ArticleCategoryProps = {
  meta: CategoryMeta;
};

/**
 * 記事のカテゴリ表示
 * @param root0 引数オブジェクト
 * @param root0.meta カテゴリのMeta情報
 * @returns 記事カテゴリ要素
 * @todo スタイルは後から設定
 */
export function ArticleCategory({ meta }: ArticleCategoryProps) {
  return (
    <div>
      <CategoryIcon className={ styles.icon } />
      <Link
        href={ createCategoryListFirstPagePath(meta) }
        className={ styles.link }
      >
        {meta.name}
      </Link>
    </div>
  );
}
