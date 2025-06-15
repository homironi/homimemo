import type { NextConfig } from "next";
import svgoConfig from "./svgo.config";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      // src/app/icon.svg を @svgr/webpack の対象から除外する
      // これはNext.jsのメタデータローダーに処理させるため
      exclude: /src[\\/]app[\\/]icon\.svg$/, // Windows/Linux両対応のパス
      loader: "@svgr/webpack",
      options: {
        svgoConfig,
      },
    });

    return config;
  },
  images: {
    disableStaticImages: true,
  },
  output: "export",
  distDir: "_public",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
