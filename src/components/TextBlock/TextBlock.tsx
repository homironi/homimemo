import { ReactNode } from "react";
import styles from "./TextBlock.module.css";

export type TextBlockType = "info" | "warning" | "error" | "success" | "note" | "tip" | "question";
export type TextBlockTitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props = {
  /**
   * テキストブロックの種類
   */
  blockType: TextBlockType;

  /**
   * テキストブロックのタイトル
   */
  title: string | undefined;

  /**
   * テキストブロックのタイトルレベル
   */
  titleLevel: TextBlockTitleLevel | undefined;

  /**
   * 子要素
   */
  children: ReactNode;
};

/**
 * テキストブロックコンポーネント
 * @returns テキストブロックコンポーネント
 * @todo 後でちゃんと定義する。今はStorybookのサンプルをこれに置き換えておくために途中の状態。
 */
export function TextBlock({ title, titleLevel = "h3", children }: Props) {
  const TitleTag = titleLevel;
  return (
    <div>
      {title && <TitleTag className={ styles.title }>{title}</TitleTag>}
      {children}
    </div>
  );
}
