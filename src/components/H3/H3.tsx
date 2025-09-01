import { ExternalLink } from "@/components/ExternalLink";
import React, { PropsWithChildren } from "react";
import styles from "./H3.module.css";

export type H3Props = PropsWithChildren<
  React.HTMLAttributes<HTMLHeadingElement>
>;

/**
 * 下線スタイルのH3コンポーネント
 * @param props h3要素のプロパティ
 * @param props.children h3要素の子要素
 * @param props.className CSSクラス名
 * @returns 下線スタイルのh3コンポーネント
 */
export function H3({ children, className, ...props }: H3Props) {
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === ExternalLink) {
      const {
        href,
        children: childChildren,
        ...anchorProps
      } = child.props as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        children?: React.ReactNode;
      };
      return (
        <a href={href} {...anchorProps}>
          {childChildren}
        </a>
      );
    }
    return child;
  });

  return (
    <h3 className={`${styles.h3} ${className ?? ""}`} {...props}>
      {processedChildren}
    </h3>
  );
}
