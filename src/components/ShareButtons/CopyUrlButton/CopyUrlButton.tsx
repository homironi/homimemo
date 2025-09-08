"use client";

import { CheckIcon, LinkIcon } from "@/assets/icons";
import { Button } from "@/components/Button";
import { useState } from "react";
import styles from "./CopyUrlButton.module.css";

type CopyUrlButtonProps = {
  url: string;
};

/**
 * URLをクリップボードにコピーするボタン
 * @param root0 引数オブジェクト
 * @param root0.url コピーするURL
 * @returns コピー用ボタンのコンポーネント
 */
export function CopyUrlButton({ url }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <Button onClick={ handleCopy } disabled={ copied } title="URLをコピー">
      {copied ? (
        <CheckIcon className={ `${styles.icon} ${styles["copied-icon"]}` } />
      ) : (
        <LinkIcon className={ `${styles.icon} ${styles["link-icon"]}` } />
      )}
    </Button>
  );
}
