import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleCard } from "./index";

const meta = {
  component: ArticleCard,
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMeta = {
  id: "sample-article",
  title: "サンプル記事タイトル",
  description: "これはサンプル記事の説明です。記事の内容はここに記載されます。",
  category: {
    name: "サンプルカテゴリ",
    slug: "sample-category",
  },
  publishDate: new Date("2023-10-01"),
  lastModDate: new Date("2024-01-21"),
  draft: false,
};

export const Sample: Story = {
  args: {
    meta: sampleMeta,
  },
};

export const NoMod: Story = {
  args: {
    meta: {
      ...sampleMeta,
      lastModDate: new Date("2023-10-01"),
      title: "更新日と公開日が同じ（更新なし）のサンプル記事",
    },
  },
};

export const LongTitle: Story = {
  args: {
    meta: {
      ...sampleMeta,
      title: "非常に長いタイトルのサンプル記事です。これはテスト用の長いタイトルで、カードのレイアウトが崩れないか確認するために使用されます。非常に長いタイトルのサンプル記事です。これはテスト用の長いタイトルで、カードのレイアウトが崩れないか確認するために使用されます。",
    },
  },
};
