import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CopyUrlButton } from "./index";

const meta = {
  component: CopyUrlButton,
} satisfies Meta<typeof CopyUrlButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    url: "https://example.com",
  },
};
