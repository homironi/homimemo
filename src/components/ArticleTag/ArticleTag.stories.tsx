import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleTag } from "./index";

const meta = {
  component: ArticleTag,
} satisfies Meta<typeof ArticleTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    meta: {
      name: "サンプルタグ",
      slug: "sample",
      description: "サンプルタグの説明",
    },
  },
};
