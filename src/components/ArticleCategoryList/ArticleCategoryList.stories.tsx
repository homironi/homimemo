import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CategoryMeta } from "@/schemas/article/meta";
import { ArticleCategoryList } from "./index";

const meta = {
  component: ArticleCategoryList,
} satisfies Meta<typeof ArticleCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCategory: CategoryMeta = {
  name: "サンプルカテゴリ",
  slug: "sample",
  description: "これはサンプルカテゴリの説明です。",
};

export const Sample: Story = {
  args: {
    categories: Array.from({ length: 10 }, (_, i) => ({
      ...sampleCategory,
      name: (`${i + 1}-サンプルカテゴリ`).slice(0, i + 1),
      slug: `sample-${i + 1}`,
    })),
  },
};
