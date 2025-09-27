import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleListPageNumbers } from "./index";

const meta = {
  component: ArticleListPageNumbers,
} satisfies Meta<typeof ArticleListPageNumbers>;

export default meta;
type Story = StoryObj<typeof meta>;
const sample = {
  allArticlesLength: 24,
  listPagePathBase: "/sample-base-path/",
  currentPageNumber: 1,
};

export const Sample: Story = {
  args: sample,
};

export const Less: Story = {
  args: {
    ...sample,
    allArticlesLength: 24,
    currentPageNumber: 2,
  },
};

export const Empty: Story = {
  args: {
    ...sample,
    allArticlesLength: 0,
  },
};

export const ManyCurrentFirst: Story = {
  args: {
    ...sample,
    allArticlesLength: 240,
  },
};

export const ManyCurrentLast: Story = {
  args: {
    ...sample,
    allArticlesLength: 240,
    currentPageNumber: 20,
  },
};

export const ManyCurrent10: Story = {
  args: {
    ...sample,
    allArticlesLength: 240,
    currentPageNumber: 10,
  },
};
