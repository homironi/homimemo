import { TagMeta } from "@/schemas/article/meta";
import Link from "next/link";

export type ArticleTagProps = {
  meta: TagMeta;
};

/**
 * 記事のタグ
 * @param root0 引数オブジェクト
 * @param root0.meta タグ情報
 * @returns 記事のタグ要素
 */
export function ArticleTag({ meta }: ArticleTagProps) {
  return (
    <div>
      <Link href={ `/tags/${meta.slug}/` }>
        { meta.name }
      </Link>
    </div>
  );
}
