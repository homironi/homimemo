import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleCategory } from "./index";

const meta = {
  component: ArticleCategory,
} satisfies Meta<typeof ArticleCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    meta: {
      name: "サンプルカテゴリ",
      slug: "sample",
      description:
        "説明。任意なのでない場合もある。ここでは特に使用しないかも？ マウスオーバーでツールチップ的な表示もあり？",
    },
  },
};
