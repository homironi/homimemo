import { ExternalLink } from "@/components/ExternalLink";
import CharaIcon from "@public/images/icon_chara_white.svg";
import React, { PropsWithChildren } from "react";
import styles from "./H2.module.css";

export type H2Props = PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>;

/**
 * 吹き出しスタイルのH2コンポーネント
 * @param props h2要素のプロパティ
 * @param props.children h2要素の子要素
 * @param props.className CSSクラス名
 * @returns 吹き出しスタイルのh2コンポーネント
 */
export function H2({ children, className, ...props }: H2Props) {
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === ExternalLink) {
      const { href, children: childChildren, ...anchorProps } = child.props as React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode };
      return <a href={ href } { ...anchorProps }>{ childChildren }</a>;
    }
    return child;
  });

  return (
    <h2 className={ `${styles.h2} ${className ?? ""}` } { ...props }>
      <CharaIcon className={ styles.icon } />
      { processedChildren }
    </h2>
  );
}
