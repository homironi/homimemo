import { ReactNode } from "react";

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
 * @param root0 引数オブジェクト
 * @param root0.title テキストブロックのタイトル
 * @param root0.titleLevel テキストブロックのタイトルレベル
 * @param root0.children 子要素
 * @returns テキストブロックコンポーネント
 * @todo 後でちゃんと定義する。今はStorybookのサンプルをこれに置き換えておくために途中の状態。
 */
export function TextBlock({ title, titleLevel = "h3", children }: Props) {
  const TitleTag = titleLevel;
  return (
    <div>
      {title && <TitleTag>{title}</TitleTag>}
      {children}
    </div>
  );
}
