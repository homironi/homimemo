import { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon } from "@/assets/icons";
import { getPageLength as getPageNumbers } from "@/lib/article";
import { JSX } from "react";
import styles from "./ArticleListPageNumbers.module.css";

export type ArticleListPageNumbersProps = {
  listPagePathBase: string;
  currentPageNumber: number;
  allArticlesLength: number;
};

/**
 * 記事リストページのページ番号表示要素
 * @param root0 引数オブジェクト
 * @param root0.listPagePathBase リストページのパスのベース
 * @param root0.currentPageNumber 現在のページの番号
 * @param root0.allArticlesLength 対象の全記事件数
 * @returns ページ番号要素
 * @description 数字2桁くらいまでしか考慮してスタイリングしてないので、3桁以上が必要になったら調整が必要
 */
export function ArticleListPageNumbers({
  listPagePathBase,
  currentPageNumber,
  allArticlesLength,
}: ArticleListPageNumbersProps) {
  const pageNumbers = getPageNumbers(allArticlesLength);
  if (pageNumbers.length === 0) {
    pageNumbers.push(currentPageNumber);
  }

  const linkPathBase = listPagePathBase.endsWith("/")
    ? listPagePathBase
    : `${listPagePathBase}/`;

    const firstPageNumber = pageNumbers.at(0);
    const lastPageNumber = pageNumbers.at(pageNumbers.length - 1);

    const currentPageIndex = pageNumbers.findIndex(num => num===currentPageNumber);

    const prePageNumber = pageNumbers.at(currentPageIndex - 1 < 0 ? 0 : currentPageIndex - 1);
    const nextNumber = pageNumbers.at(currentPageIndex + 1 >= pageNumbers.length
      ? pageNumbers.length - 1 
      : currentPageIndex + 1);
    
    const viewPageNumbers:number[] = getViewPageNumbers(pageNumbers, currentPageIndex, 3);

  return (
    <div className={ styles.container }>
      <IconPageNation
        icon={ <FirstPageIcon/> }
        isActive={ currentPageNumber !== firstPageNumber }
        href={ `${linkPathBase}${firstPageNumber}` }
      />
      <IconPageNation
        icon={ <ChevronLeftIcon/> }
        isActive={ currentPageNumber !== prePageNumber }
        href={ `${linkPathBase}${prePageNumber}` }
      />
      <ol className={ styles.list }>
        {viewPageNumbers.map((pageNumber) => {
          const linkPath = `${linkPathBase}${pageNumber}`;
          const isCurrent = pageNumber == currentPageNumber;

          return (
            <li
              key={ pageNumber }
              className={ styles.item }
            >
              <a
                href={ linkPath }
                className={ isCurrent ? styles["link-current"] : styles.link }
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
      </ol>
      <IconPageNation
        icon={ <ChevronRightIcon/> }
        isActive={ currentPageNumber !== nextNumber }
        href={ `${linkPathBase}${nextNumber}` }
      />
      <IconPageNation
        icon={ <LastPageIcon/> }
        isActive={ currentPageNumber !== lastPageNumber }
        href={ `${linkPathBase}${lastPageNumber}` }
      />
    </div>
  );
}

function getViewPageNumbers(pageNumbers:number[], currentPageIndex:number, viewNum:number):number[]{
  const pageNumbersLength = pageNumbers.length;
  if(pageNumbersLength  <= viewNum){
    return pageNumbers;
  }
  
  if(currentPageIndex < viewNum){
    return pageNumbers.slice(0, viewNum);
  }

  const pageNumbersLastIndex = pageNumbersLength - 1;
  if(currentPageIndex + 1 > pageNumbersLastIndex){
    return pageNumbers.slice(-viewNum);
  }

  // current前後をとる
  return pageNumbers.slice(currentPageIndex - (Math.floor(viewNum / 2)), currentPageIndex + (Math.floor(viewNum / 2) + 1));
}

type IconPageNationProps = {
  icon:React.ReactNode,
  href:string,
  isActive:boolean,
};

function IconPageNation({icon, isActive, href}:IconPageNationProps):JSX.Element{
  if(isActive){
    return(
      <a
        href={ href }
        className={ styles.icon }
      >
        {icon}
      </a>
    );
  }

  return(
    <span className={ `${styles.icon} ${styles["icon-disabled"]}` } />
  );
}
