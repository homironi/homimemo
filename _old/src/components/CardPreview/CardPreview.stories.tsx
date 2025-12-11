import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CardPreview } from "./index";

const meta = {
  component: CardPreview,
} satisfies Meta<typeof CardPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    url: "https://example.com",
    title: "Sample Title",
    description: "Sample Description",
    imageUrl: "https://placehold.jp/1200x630.png",
  },
};

export const Long: Story = {
  args: {
    url: "https://example.com/long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-title/",
    title:
      "Sample Long Title Sample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long TitleSample Long Title",
    description:
      "Sample Description long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long",
    imageUrl: "https://placehold.jp/1200x630.png",
  },
};

export const NoImage: Story = {
  args: {
    url: "https://example.com",
    title: "Sample Title",
    description: "Sample Description",
  },
};
