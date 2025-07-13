import { OpenInNewIcon } from "@/assets/icons";
import { PropsWithChildren } from "react";
import styles from "./ExternalLink.module.css";

export type ExternalLinkProps = PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>;

/**
 * 外部リンクコンポーネント（すべて新しいタブで開く）
 * @param props リンクのプロパティ
 * @param props.href リンク先のURL
 * @param props.children リンクの子要素
 * @param props.className CSSクラス名
 * @returns 外部リンクコンポーネント
 */
export function ExternalLink({ href, children, className, ...rest }: ExternalLinkProps) {
  return (
    <a
      href={ href }
      target="_blank"
      rel="noopener noreferrer"
      className={ `${styles.link} ${className ?? ""}` }
      { ...rest }
    >
      { children }
      <OpenInNewIcon className={ styles.icon } />
    </a>
  );
}
