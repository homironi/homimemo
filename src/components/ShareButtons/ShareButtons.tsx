import { CopyUrlButton } from "./CopyUrlButton";
import { WebShareButton } from "./WebShareButton";

export type ShareButtonsProps = {
  slug: string;
  title: string;
};

export function ShareButtons({ slug, title }: ShareButtonsProps) {
  const shareUrl = `https://homironi.com/${slug}`;
  return (
    <div>
      <CopyUrlButton url={shareUrl} />
      <WebShareButton url={shareUrl} title={title} />
    </div>
  );
}
