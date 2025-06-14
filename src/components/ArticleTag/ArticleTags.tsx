import { TagMeta } from "@/schemas/article/meta";
import { ArticleTag } from "./index";

export type ArticleTagsProps = {
  tags?: TagMeta[];
};

/**
 * 記事のタグリストの表示
 * @param root0 引数オブジェクト
 * @param root0.tags タグ情報配列
 * @returns 記事のタグリスト要素
 */
export function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <ul>
      {tags && tags.map((meta) => {
        return (
          <li key={ meta.slug }>
            <ArticleTag meta={ meta } />
          </li>
        );
      })}
    </ul>
  );
}
