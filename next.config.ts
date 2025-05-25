import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "_public",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
