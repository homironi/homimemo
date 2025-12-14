// @ts-check
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeSlug from "rehype-slug";
import { rehypeCodeContainer } from "./src/lib/rehypePlugins/code";
import { rehypeGfmTaskList } from "./src/lib/rehypePlugins/gfmTaskList";

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
    }), partytown({
      config: {
        forward: ["dataLayer.push"],
      }
    }),
    mdx(),
  ],

  markdown: {
    syntaxHighlight: "prism",
    rehypePlugins: [
      rehypeSlug,
      () => rehypeAutolinkHeadings({behavior: "wrap"}),
      rehypeCodeTitles,
      rehypeCodeContainer,
      rehypeGfmTaskList,
    ],
  }
});