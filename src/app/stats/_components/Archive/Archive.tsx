import { HomironiRoundStarIcon } from "@/assets/icons";
import { ArticleMeta } from "@/schemas/article/meta";
import styles from "./Archive.module.css";

type YearArchive = {
  year: number;
  count: number;
};

/**
 * ArchiveComponent用のデータを作成する
 * @param articles 記事
 * @returns ArchiveComponent用のデータ
 */
export function createArchiveByYear(articles: ArticleMeta[]): YearArchive[]{
  const archive  =  articles.reduce((acc, current)=>{
    const year = current.publishDate.getFullYear();
    acc.set(year, (acc.get(year) || 0) + 1);
    return acc;
  }, new Map<number, number>());
  
  return Array.from(archive)
    .map<YearArchive>(entry => ({year: entry[0], count: entry[1] }))
    .sort((a, b) => b.year - a.year);
};

type ArchiveProps = {
  archive: YearArchive[];
};

/**
 * 年ごとの記事数を表示する
 * @param root0 引数オブジェクト
 * @param root0.archive 年ごとの記事数情報
 * @returns 年ごとの記事数を表示する要素
 */
export function Archive({ archive }: ArchiveProps){
  return (
    <div className={ styles.container }>
      {archive.map(yearData => (
        <div key={ yearData.year } className={ styles["year-container"] }>
          <HomironiRoundStarIcon className={ styles.icon } />
          <div className={ styles["text-container"] }>
            <p>{yearData.year}</p>
            <p>{yearData.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
