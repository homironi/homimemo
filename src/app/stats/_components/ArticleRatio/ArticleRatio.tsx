import { PercentBar } from "@/components/PercentBar";

export type ArticleRatioProps = {
  allArticlesLength: number;
  length : number;
  href : string;
  name : string;
};

/**
 * 記事の割合を表示する要素Component
 * @param root0 引数オブジェクト
 * @param root0.allArticlesLength 全記事数
 * @param root0.length 対象記事数
 * @param root0.href 表示する名前のリンク
 * @param root0.name 表示する名前
 * @returns 記事の割合を表示する要素
 */
export function ArticleRatio({ allArticlesLength, length, href, name }:ArticleRatioProps){
  const ratio = Math.ceil(length / allArticlesLength * 100 * 10) / 10;
  return(
    <>
      <a href={ href }>{name}</a>：{length}件 {ratio}%
      <PercentBar max={ allArticlesLength } current={ length } />
    </>
  );
}