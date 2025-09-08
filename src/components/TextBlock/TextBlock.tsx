import {
  ErrorIcon,
  InfoIcon,
  NoteIcon,
  QuestionIcon,
  SuccessIcon,
  TipsIcon,
  WarningIcon,
} from "@/assets/icons";
import { ReactNode } from "react";
import styles from "./TextBlock.module.css";

export type TextBlockType =
  | "info"
  | "warning"
  | "error"
  | "success"
  | "note"
  | "tip"
  | "question";

type Props = {
  /**
   * テキストブロックの種類
   */
  blockType: TextBlockType;

  /**
   * テキストブロックのタイトル
   */
  title?: string;

  /**
   * 子要素
   */
  children: ReactNode;
};

/**
 * TextBlockTypeに対応するアイコンを取得する
 * @param blockType テキストブロックの種類
 * @returns 対応するアイコンコンポーネント
 */
function getIconForBlockType(blockType: TextBlockType) {
  const iconMap = {
    info: InfoIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    success: SuccessIcon,
    note: NoteIcon,
    tip: TipsIcon,
    question: QuestionIcon,
  };

  return iconMap[blockType];
}

/**
 * テキストブロックコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.blockType テキストブロックの種類
 * @param root0.title テキストブロックのタイトル
 * @param root0.titleLevel テキストブロックのタイトルレベル
 * @param root0.children 子要素
 * @returns テキストブロックコンポーネント
 */
export function TextBlock({
  blockType,
  title,
  children,
}: Props) {
  const Icon = getIconForBlockType(blockType);

  return (
    <div
      className={ `${styles["text-block"]} ${styles[`text-block-${blockType}`]}` }
    >
      <Icon className={ styles.icon } />
      {title && <p className={ styles.title }>{title}</p>}
      <div className={ styles.content }>{children}</div>
    </div>
  );
}
