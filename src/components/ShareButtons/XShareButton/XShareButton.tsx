"use client";

import { XLogo } from "@/assets/logos";
import { Button } from "@/components/Button";

export function XShareButton({ url, title }: { url: string; title: string }) {
  const handleShare = () => {
    const tweetText = encodeURIComponent(`${title}\n${url}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  return (
    <Button onClick={handleShare} className="" title="Xでシェア">
      <XLogo />
    </Button>
  );
}
