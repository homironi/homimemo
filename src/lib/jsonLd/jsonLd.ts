import { siteOrigin } from "@/lib/utils";
import { Person } from "schema-dts";

export const author : Person = {
  "@type": "Person",
  name: "homi",
  alternateName: "homironi",
  image: [`${siteOrigin}/images/profile.webp`],
  url: `${siteOrigin}/profile/`
};
