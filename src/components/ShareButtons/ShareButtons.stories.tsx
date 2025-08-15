import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ShareButtons } from "./index";

const meta = {
  component: ShareButtons,
} satisfies Meta<typeof ShareButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    url: "https://example.com",
  },
};
