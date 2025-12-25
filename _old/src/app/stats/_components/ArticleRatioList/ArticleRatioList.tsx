import { ArticleRatio, ArticleRatioProps } from "../ArticleRatio/ArticleRatio";
import styles from "./ArticleRatioList.module.css";

type Item = ArticleRatioProps & {
  key : string;
};

export type ArticleRatioListProps = {
  list : Item[];
};

/**
 * 記事の割合を表示するリスト
 * @param root0 引数オブジェクト
 * @param root0.list 記事の割合のデータリスト
 * @returns 記事の割合を表示するリスト要素
 */
export function ArticleRatioList({ list }:ArticleRatioListProps){
  return(
    <ul className={ styles.list }>
      {list.map(({ key, allArticlesLength, length, href, name })=>{
        return (
          <li key={ key } className={ styles.li }>
            <ArticleRatio
              allArticlesLength={ allArticlesLength }
              length={ length }
              href={ href }
              name={ name }
            />
          </li>);
      })}
    </ul>
  );
}