// @ts-check
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import playformInline from "@playform/inline";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import { rehypeGfmTaskList } from "./src/lib/rehype/gfmTaskList";

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
  }), expressiveCode({
    // 指定はデフォルトのテーマですが、ビルド時にテーマが含まれるように必ず明示的にテーマを指定する
    themes: ["github-dark", "github-light"],
  }), mdx(), sitemap(), playformInline(), playformCompress()],

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      rehypeGfmTaskList,
    ],
  }
});