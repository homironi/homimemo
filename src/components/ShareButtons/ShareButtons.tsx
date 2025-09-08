import { createTitleFromTemplate, createUrlFromSlug } from "@/lib/utils";
import { CopyUrlButton } from "./CopyUrlButton";
import { WebShareButton } from "./WebShareButton";
import { XShareButton } from "./XShareButton";

export type ShareButtonsProps = {
  slug: string;
  title: string;
};

/**
 *
 * @param root0
 * @param root0.slug
 * @param root0.title
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
