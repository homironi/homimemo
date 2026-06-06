// @ts-check
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeGithubColor from "rehype-github-color";
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

  markdown: {
    processor: unified({
      rehypePlugins: [
        rehypeSlug,
        rehypeGfmTaskList,
        rehypeGithubColor,
      ],
    }),
  },

  integrations: [
    icon({
      iconDir: "src/assets/icons",
    }),
    // Astro6に上げたら「`markdown.remarkPlugins`, `markdown.rehypePlugins`, and `markdown.remarkRehype` are deprecated. Pass them to `unified({...})` from `@astrojs/markdown-remark` directly instead.」
    // 警告なだけなのでAstro8まではほっといてもよい
    expressiveCode({
      // 指定はデフォルトのテーマですが、ビルド時にテーマが含まれるように必ず明示的にテーマを指定する
      themes: ["github-dark", "github-light"],
    }),
    mdx(),
    sitemap(),
    playformCompress({
      // media screen のCSSが効かなくなってしまったのでCSSは無効にする
      CSS: false,
    }),
  ],
});
