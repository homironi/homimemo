import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { XShareButton } from "./index";

const meta = {
  component: XShareButton,
} satisfies Meta<typeof XShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    url: "https://example.com",
    title: "お試しタイトル",
  },
};
