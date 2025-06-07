import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Footer } from "./index";

const meta = {
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
};
