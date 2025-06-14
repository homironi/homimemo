import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleTags } from "./index";

const meta = {
  component: ArticleTags,
} satisfies Meta<typeof ArticleTags>;

export default meta;
type Story = StoryObj<typeof meta>;
const tag = {
  name: "サンプルタグ",
  slug: "sample",
  description: "サンプルタグの説明",
};
const tags = [
  tag,
  {
    name: "サンプルタグ1",
    slug: "sample1",
    description: "サンプルタグの説明1",
  },
];

export const One: Story = {
  args: {
    tags: [tag],
  },
};

export const Multi: Story = {
  args: {
    tags: tags,
  },
};
