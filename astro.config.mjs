// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://homironi.com",
  outDir: "./_public",
  trailingSlash: "always",
  build: {
    format: "directory",
  }
});
