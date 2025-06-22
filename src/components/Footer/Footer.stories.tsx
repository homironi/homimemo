import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Footer } from "./index";

const meta = {
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    links: [
      { href: "/articles/", label: "記事一覧" },
      { href: "/about/", label: "このサイトについて" },
      { href: "/contact/", label: "お問い合わせ" },
      { href: "/privacy/", label: "プライバシーポリシー" },
    ],
  },
};
