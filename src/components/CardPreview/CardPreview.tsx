import { noImageUrl } from "@/lib/utils";
import Link from "next/link";
import styles from "./CardPreview.module.css";

export type CardPreviewProps = {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

export function CardPreview({
  url,
  title,
  description,
  imageUrl,
}: CardPreviewProps) {
  const validImageUrl = imageUrl?.trim() ?? noImageUrl;
  return (
    <div className={styles.container}>
      <Link href={url} target="_blank" className={styles.link}>
        <div className={styles["image-container"]}>
          {/* テキストのサイズに合わせて画像を拡縮するためにラップ */}
          <div className={styles["image-container-2"]}>
            <img src={validImageUrl} alt={title} className={styles.image} />
          </div>
        </div>
        <div className={styles.texts}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.url}>{url}</div>
        </div>
      </Link>
    </div>
  );
}
