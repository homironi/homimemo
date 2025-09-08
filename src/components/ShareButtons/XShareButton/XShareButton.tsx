"use client";

import { XLogo } from "@/assets/logos";
import { Button } from "@/components/Button";
import styles from "./XShareButton.module.css";

/**
 * Xでシェアするボタン
 * @param root0 引数オブジェクト
 * @param root0.url シェアするURL
 * @param root0.title シェアするタイトル
 * @returns 共有ボタンのコンポーネント
 */
export function XShareButton({ url, title }: { url: string; title: string }) {
  const handleShare = () => {
    const tweetText = encodeURIComponent(`${title}\n${url}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <Button onClick={ handleShare } title="Xでシェア">
      <XLogo className={ styles.icon } />
    </Button>
  );
}
