import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Favicon } from "./Favicon";

const meta: Meta<typeof Favicon> = {
  component: Favicon,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    href: "https://example.com",
    alt: "サンプルのfavicon",
  },
};

export const InternalLink: Story = {
  args: {
    href: "/articles/sample-article",
    alt: "内部記事へのリンクのfavicon",
  },
};

export const GitHub: Story = {
  args: {
    href: "https://github.com",
    alt: "GitHubのfavicon",
  },
};
