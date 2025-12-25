// @ts-check
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://homironi.com",
  outDir: "./_public",
  trailingSlash: "always",

  build: {
    format: "directory",
  },

  integrations: [icon({
    iconDir: "src/assets/icons",
  }), partytown({
    config: {
      forward: ["dataLayer.push"],
    }
  })]
});