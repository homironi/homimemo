import { CardPreview, CardPreviewProps } from "@/components/CardPreview";
import { ExternalLink } from "@/components/ExternalLink";
import { array, nullable, object, optional, safeParse, string } from "valibot";

export type CardPreviewUrlProps = {
  url: string;
};

const OGPScannerResponseSchema = object({
  html: object({
    title: optional(nullable(string())),
    description: optional(nullable(string())),
  }),
  ogp: object({
    "og:title": optional(array(string())),
    "og:description": optional(array(string())),
    "og:image": optional(array(string())),
  }),
});

export async function CardPreviewUrl({ url }: CardPreviewUrlProps) {
  const response = await fetch(
    `https://ogp-scanner.kunon.jp/v1/ogp_info?url=${url}`
  );
  const json = await response.json().catch(() => null);
  if (json) {
    const scanData = safeParse(OGPScannerResponseSchema, json);
    if (scanData.success) {
      const cardData: CardPreviewProps = {
        url,
        title:
          scanData.output.ogp?.["og:title"]?.[0] ??
          scanData.output.html?.title ??
          url,
        description:
          scanData.output.ogp?.["og:description"]?.[0] ??
          scanData.output.html?.description ??
          undefined,
        imageUrl: scanData.output.ogp?.["og:image"]?.[0],
      };

      return <CardPreview {...cardData} />;
    }
  }

  return (
    <p>
      <ExternalLink href={url}>{url}</ExternalLink>
    </p>
  );
}
