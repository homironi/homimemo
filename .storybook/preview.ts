import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globalElement.css";
import "../src/app/globals.css";

const preview: Preview = {
  tags: [
    "autodocs",
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
