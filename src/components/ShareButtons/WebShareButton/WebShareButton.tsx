"use client";

import { ShareIcon } from "@/assets/icons";
import { Button } from "@/components/Button";
import styles from "./WebShareButton.module.css";

type WebShareButtonProps = {
  url: string;
  title: string;
  text?: string;
};

/**
 * Web Share APIを使ったシェアボタン
 * @param root0 引数オブジェクト
 * @param root0.url シェアするURL
 * @param root0.title シェアするタイトル
 * @param root0.text シェアするテキスト
 * @returns 共有ボタンのコンポーネント
 */
export function WebShareButton({ url, title, text }: WebShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
    }
  };

  return (
    <Button onClick={ handleShare } title="シェア">
      <ShareIcon className={ styles.icon } />
    </Button>
  );
}
