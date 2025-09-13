import { OpenInNewIcon } from "@/assets/icons";
import { PropsWithChildren } from "react";
import { Favicon } from "../Favicon/Favicon";
import styles from "./ExternalLink.module.css";

export type ExternalLinkProps = PropsWithChildren<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>;

/**
 * 外部リンクコンポーネント（すべて新しいタブで開く）
 * @param props リンクのプロパティ
 * @param props.href リンク先のURL
 * @param props.children リンクの子要素
 * @returns 外部リンクコンポーネント
 */
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  const text = children?.toString();
  const faviconAlt = `${ text ? `「${text}」` : "リンク"}のfavicon`;
  return (
    <a
      href={ href }
      target="_blank"
      rel="noopener noreferrer"
      className={ `${styles.link}` }
      { ...rest }
    >
      <Favicon href={ href } alt={ faviconAlt }/>
      {children}
      <OpenInNewIcon className={ styles.icon } />
    </a>
  );
}
