import { LabelIcon } from "@/assets/icons";
import { getAllArticlesMeta } from "@/lib/_buildtime/article";
import { createTagListPagePath, filterArticlesTag } from "@/lib/article";
import { TagMeta } from "@/schemas/article/meta";
import styles from "./TagLink.module.css";

export type TagLinkProps = {
  tag : TagMeta;
};

/**
 * タグのリンク
 * @param root0 引数オブジェクト
 * @param root0.tag タグ
 * @returns タグリンクの要素
 */
export function TagLink({tag}:TagLinkProps){
  return(
    <div>
      <a href={ createTagListPagePath(tag) } >
        <LabelIcon className={ styles.icon } />{tag.name}：{filterArticlesTag(getAllArticlesMeta(),tag).length}記事
      </a>
    </div>
  );
}
