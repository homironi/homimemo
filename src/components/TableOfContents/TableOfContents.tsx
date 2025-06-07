"use client";

import { useEffect } from "react";
import tocbot from "tocbot";
import styles from "./index.module.css";

type Props = {
  tocContentSourceIdName: string;
};

/**
 * 目次コンポーネント
 * @param root0 引数オブジェクト
 * @param root0.tocContentSourceIdName 目次を生成する対処についているコンテンツのID名
 * @returns 目次のJSX要素
 */
export function TableOfContents({ tocContentSourceIdName }: Props) {
  useEffect(() => {
    tocbot.init({
      tocSelector: `.${styles.toc}`,
      contentSelector: `#${tocContentSourceIdName}`,
      headingSelector: "h2, h3",
      activeLinkClass: styles["toc-link-active"],
    });

    return () => tocbot.destroy();
  }, [tocContentSourceIdName]);

  return (
    <nav>
      <h2>自動生成目次</h2>
      <div className={ styles.toc } />
    </nav>
  );
}
