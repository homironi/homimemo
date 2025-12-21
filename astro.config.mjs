// @ts-check
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
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

  integrations: [
    icon({
      iconDir: "src/assets/icons",
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      }
    }),
    expressiveCode(),
    mdx(),
],

  markdown: {
    syntaxHighlight: "prism",
    rehypePlugins: [
      rehypeSlug,
      () => rehypeAutolinkHeadings({behavior: "wrap"}),
      rehypeGfmTaskList,
    ],
  }
});