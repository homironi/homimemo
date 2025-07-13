import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Breadcrumbs } from "./index";

const meta = {
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeOnly: Story = {
  args: {
    breadcrumbs: [
    ],
  },
};

export const Sample: Story = {
  args: {
    breadcrumbs: [
      {
        name: "一覧ページ",
        href: "/hoge/list",
      },
      {
        name: "各ページ",
        href: "/hoge/hoge-page",
      },
    ],
  },
};
