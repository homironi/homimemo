import { ArticleLink } from "@/components/ArticleLink";
import { getAllArticlesMeta } from "@/lib/_buildtime/article";
import { ArticleMeta } from "@/schemas/article/meta";
import styles from "./RelatedArticles.module.css";

// 関連記事の最大数
const relatedArticleMax = 4;

export type RelatedArticlesProps = {
  articleMeta : ArticleMeta;
};

/**
 * 引数で受け取った記事に関連する記事リストのComponent
 * @param root0 引数オブジェクト
 * @param root0.articleMeta 指定記事のメタ
 * @returns 関連記事リストComponent
 */
export function RelatedArticles({ articleMeta } : RelatedArticlesProps){
  // 現在の記事以外に絞り込み
  const otherArticles = getAllArticlesMeta()
    .filter(article => article.id !== articleMeta.id);

  // 各記事に対してタグの一致数を計算し、優先度付けして選択
  const relatedArticles: ArticleMeta[] = otherArticles
    .map(article => {
      // 現在の記事のタグと対象記事のタグの共通部分を計算
      const currentTags = articleMeta.tags ?? [];
      const targetTags = article.tags ?? [];
      
      const matchingTagsCount = currentTags.filter(tag => 
        targetTags.some(targetTag=> targetTag.slug === tag.slug)
      ).length;
      
      return {
        article,
        matchingTagsCount
      };
    })
    .filter(({matchingTagsCount})=> 0 < matchingTagsCount)
    .sort((a, b) => {
      if(b.matchingTagsCount !== a.matchingTagsCount)
      {
        // タグの一致度降順
        return b.matchingTagsCount - a.matchingTagsCount;
      }
      
      // タグの一致度が同じ時は最終更新日新しい順
      return b.article.lastModDate.getTime() - a.article.lastModDate.getTime();
    })
    .slice(0, relatedArticleMax)
    .map(item => item.article);
  
  if(relatedArticles.length <= 0){
    return null;
  }

  return(
    <div>
      <p className={ styles.title }>関連記事</p>
      <ul className={ styles.list }>
        {relatedArticles.map(article=>{
          return (
            <li key={ article.id } className={ styles.item }>
              <ArticleLink meta={ article } />
            </li>
          );
        })}
      </ul>
    </div>
  );
}