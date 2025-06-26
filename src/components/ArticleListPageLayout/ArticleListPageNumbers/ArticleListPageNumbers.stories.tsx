import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleListPageNumbers } from "./index";

const meta = {
  component: ArticleListPageNumbers,
} satisfies Meta<typeof ArticleListPageNumbers>;

export default meta;
type Story = StoryObj<typeof meta>;
const sample = {
  allArticlesLength: 3,
  listPagePathBase: "/sample-base-path/",
  currentPageNumber: 1,
};

export const Sample: Story = {
  args: sample,
};

export const Empty: Story = {
  args: {
    ...sample,
    allArticlesLength: 0,
  },
};
