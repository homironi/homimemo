import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ほみろに",
    short_name: "ほみろに",
    description: "ゲームやプログラミング、お絵かきなどいろんなことを書く、ほみの個人サイトです。",
    start_url: "/",
    theme_color: "#79cdee",
    background_color: "#fcf9f7",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "favicon.ico",
        sizes: "32x32 16x16",
        type: "image/x-icon",
      },
      {
        src: "/icon/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
