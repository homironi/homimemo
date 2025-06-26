import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleMeta } from "@/schemas/article/meta";
import { ArticleListPageLayout } from "./index";

const meta = {
  component: ArticleListPageLayout,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ArticleListPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMetaList: ArticleMeta[] = Array.from({ length: Math.ceil(16) }, (_, i) => {
  return {
    id: `sample-article-${i + 1}`,
    title: `サンプル記事タイトル-${i + 1}`,
    description: "これはサンプル記事の説明です。記事の内容はここに記載されます。",
    category: {
      name: "サンプルカテゴリ",
      slug: "sample-category",
    },
    publishDate: new Date("2023-10-01"),
    lastModDate: new Date("2024-01-21"),
    draft: false,
  };
});

const sampleProps = {
  title: "サンプル記事一覧",
  articles: [
    sampleMetaList[0],
  ],
  listPagePathBase: "/sample-base-path/",
  currentPageNumber: 1,
};

export const Sample: Story = {
  args: sampleProps,
};

export const Empty: Story = {
  args: {
    ...sampleProps,
    articles: [
    ],
  },
};

export const First: Story = {
  args: {
    ...sampleProps,
    articles: sampleMetaList,
    currentPageNumber: 1,
  },
};

export const Second: Story = {
  args: {
    ...sampleProps,
    articles: sampleMetaList,
    currentPageNumber: 2,
  },
};
