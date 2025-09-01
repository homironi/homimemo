import { ErrorPageItem } from "@/assets/items";
import React from "react";
import styles from "./ErrorPage.module.css";

export type ErrorPageProps = {
  errorCode: string;
  errorTitle: string;
  errorMessage: React.ReactNode;
};

/**
 * エラーページコンポーネント
 * @param props エラーページのプロパティ
 * @param props.errorCode エラーコード
 * @param props.errorTitle エラータイトル
 * @param props.errorMessage エラーメッセージ
 * @returns エラーページコンポーネント
 */
export function ErrorPage({
  errorCode,
  errorTitle,
  errorMessage,
}: ErrorPageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ErrorPageItem className={styles.icon} />
        <h1 className={styles.title}>
          <span className={styles["error-code"]}>{errorCode}</span>
          <span className={styles["error-title"]}>{errorTitle}</span>
        </h1>
        <div className={styles.message}>{errorMessage}</div>
      </div>
    </div>
  );
}
