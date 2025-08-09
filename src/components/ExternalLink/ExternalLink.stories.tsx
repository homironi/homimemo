import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExternalLink } from "./ExternalLink";

const meta: Meta<typeof ExternalLink> = {
  title: "Components/ExternalLink",
  component: ExternalLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "リンク先のURL",
    },
    children: {
      control: "text",
      description: "リンクのテキスト",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "https://example.com",
    children: "外部サイトへのリンク",
  },
};

export const InternalLink: Story = {
  args: {
    href: "/articles/sample-article",
    children: "内部記事へのリンク",
  },
};

export const LongText: Story = {
  args: {
    href: "https://github.com/example/repository",
    children: "これは非常に長いテキストを含むリンクで、アイコンの配置を確認するためのものです",
  },
};
