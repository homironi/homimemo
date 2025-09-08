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
 *
 * @param root0
 * @param root0.url
 * @param root0.title
 * @param root0.text
 */
export function WebShareButton({ url, title, text }: WebShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (error) {
        console.error("シェアに失敗しました:", error);
      }
    }
  };

  return (
    <Button onClick={ handleShare } title="シェア">
      <ShareIcon className={ styles.icon } />
    </Button>
  );
}
