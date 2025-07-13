import type { StorybookConfig } from "@storybook/nextjs-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: [
    "../src/stories/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: [
    "../public",
  ],
  viteFinal(config) {
    config.plugins?.push(
      svgr({
        include: /\.svg$/,
      }),
    );
    config.plugins = config.plugins?.flat().map((plugin) => {
      if (
        typeof plugin === "object"
        && plugin !== null
        && "name" in plugin
        && plugin.name === "vite-plugin-storybook-nextjs-image"
      ) {
        return {
          ...plugin,
          resolveId(id, importer) {
            if (id.endsWith(".svg")) {
              return null;
            }
            // @ts-expect-error `resolveId` hook of vite-plugin-storybook-nextjs-image is a function
            return plugin.resolveId(id, importer);
          },
        };
      }
      return plugin;
    });
    return config;
  },
};

export default config;
