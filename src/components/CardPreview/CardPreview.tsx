import { noImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import styles from "./CardPreview.module.css";

export type CardPreviewProps = {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

/**
 * カードプレビューコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.url 記事のURL
 * @param root0.title 記事のタイトル
 * @param root0.description 記事の説明
 * @param root0.imageUrl 記事の画像URL
 * @returns 記事のカードプレビューのJSX要素
 */
export function CardPreview({
  url,
  title,
  description,
  imageUrl,
}: CardPreviewProps) {
  const validImageUrl = imageUrl?.trim() ?? noImageUrl;
  return (
    <div className={ styles.container }>
      <Link href={ url } target="_blank" className={ styles.link }>
        <div className={ styles["image-container"] }>
          {/* テキストのサイズに合わせて画像を拡縮するためにラップ */}
          <div className={ styles["image-container-2"] }>
            <Image src={ validImageUrl } fill alt={ title } className={ styles.image } />
          </div>
        </div>
        <div className={ styles.texts }>
          <div className={ styles.title }>{title}</div>
          <div className={ styles.description }>{description}</div>
          <div className={ styles.url }>{url}</div>
        </div>
      </Link>
    </div>
  );
}
