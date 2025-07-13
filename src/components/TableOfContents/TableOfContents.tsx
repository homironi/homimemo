"use client";

import { useEffect } from "react";
import tocbot from "tocbot";
import "./TableOfContents.css";
import styles from "./TableOfContents.module.css";

export type TableOfContentsProps = {
  className?: string;
  tocContentSourceIdName: string;
};

const tocSelectorName = "article-toc";

/**
 * 目次コンポーネント
 * @param root0 引数オブジェクト
 * @param root0.tocContentSourceIdName 目次を生成する対処についているコンテンツのID名
 * @param root0.className 付与したいクラス名
 * @returns 目次のJSX要素
 */
export function TableOfContents({
  className,
  tocContentSourceIdName,
}: TableOfContentsProps) {
  useEffect(() => {
    tocbot.init({
      tocSelector: `.${tocSelectorName}`,
      contentSelector: `#${tocContentSourceIdName}`,
      headingSelector: "h2, h3",
      activeLinkClass: "toc-link-active",
    });

    return () => tocbot.destroy();
  }, [tocContentSourceIdName]);

  return (
    <nav className={ `${className} ${styles.container}` }>
      <p className={ styles.title }>目次</p>
      <div className={ tocSelectorName } />
    </nav>
  );
}
