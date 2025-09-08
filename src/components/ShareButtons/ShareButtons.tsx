import { createTitleFromTemplate, createUrlFromSlug } from "@/lib/utils";
import { CopyUrlButton } from "./CopyUrlButton";
import { WebShareButton } from "./WebShareButton";
import { XShareButton } from "./XShareButton";

export type ShareButtonsProps = {
  slug: string;
  title: string;
};

/**
 * 共有ボタン群
 * @param root0 引数オブジェクト
 * @param root0.slug 記事のスラッグ
 * @param root0.title 記事のタイトル
 * @returns 共有ボタン群のコンポーネント
 */
export function ShareButtons({ slug, title }: ShareButtonsProps) {
  const shareUrl = createUrlFromSlug(slug);
  const shareTitle = createTitleFromTemplate(title);
  return (
    <div>
      <CopyUrlButton url={ shareUrl } />
      <WebShareButton url={ shareUrl } title={ shareTitle } />
      <XShareButton url={ shareUrl } title={ shareTitle } />
    </div>
  );
}
