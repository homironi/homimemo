import { H2, H2Props } from "@/components/H2";
import { AdSense } from "@/components/server/Article/AdSense";

export type ArticleH2Props = H2Props & {
  visibleAdSense: boolean;
};

/**
 * 記事用のH2
 * @param props 残りの引数
 * @param props.visibleAdSense 広告を表示するかどうか
 * @returns 記事用のH2
 */
export function ArticleH2({visibleAdSense, ...props}: ArticleH2Props){
  return (
    <>
      {visibleAdSense && <AdSense adSenseType="display" />}
      <H2 { ...props } />
    </>
  );
}
