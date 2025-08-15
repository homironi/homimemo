import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WebShareButton } from "./index";

const meta = {
  component: WebShareButton,
} satisfies Meta<typeof WebShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    url: "https://example.com",
    title: "お試しタイトル",
    text: "お試しテキスト",
  },
};
