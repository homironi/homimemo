import { siteName } from "@/lib/utils";
import { CopyUrlButton } from "./CopyUrlButton";
import { WebShareButton } from "./WebShareButton";
import { XShareButton } from "./XShareButton";

export type ShareButtonsProps = {
  slug: string;
  title: string;
};

export function ShareButtons({ slug, title }: ShareButtonsProps) {
  const shareUrl = `https://homironi.com${slug}`;
  const shareTitle = `${title} | ${siteName}`;
  return (
    <div>
      <CopyUrlButton url={shareUrl} />
      <WebShareButton url={shareUrl} title={shareTitle} />
      <XShareButton url={shareUrl} title={shareTitle} />
    </div>
  );
}
