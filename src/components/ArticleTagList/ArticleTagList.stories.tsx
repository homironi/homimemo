import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TagMeta } from "@/schemas/article/meta";
import { ArticleTagList } from "./index";

const meta = {
  component: ArticleTagList,
} satisfies Meta<typeof ArticleTagList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCategory: TagMeta = {
  name: "サンプルタグ",
  slug: "sample",
  description: "これはサンプルタグの説明です。",
};

export const Sample: Story = {
  args: {
    tags: Array.from({ length: 10 }, (_, i) => ({
      ...sampleCategory,
      name: (`${i + 1}-サンプルタグ`).slice(0, i + 1),
      slug: `sample-${i + 1}`,
    })),
  },
};
