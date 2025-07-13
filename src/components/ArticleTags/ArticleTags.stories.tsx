import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleTags } from "./index";

const meta = {
  component: ArticleTags,
} satisfies Meta<typeof ArticleTags>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTag = {
  name: "サンプルタグ",
  slug: "sample",
  description: "サンプルタグの説明",
};

export const Sample: Story = {
  args: {
    tags: Array.from({ length: 3 }, (_, i) => ({
      name: `${sampleTag.name} ${i + 1}`,
      slug: `${sampleTag.slug}-${i + 1}`,
      description: `${sampleTag.description} ${i + 1}`,
    })),
  },
};

export const Empty: Story = {
  args: { tags: [] },
};
