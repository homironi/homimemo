import type { Meta, StoryObj } from "@storybook/react";

import { TextBlock } from "./index";

const meta = {
  component: TextBlock,
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    blockType: "info",
    title: "テストタイトル",
    titleLevel: "h3",
    children: <p>テストコンテンツ</p>,
  },
};
