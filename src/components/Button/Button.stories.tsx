import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./index";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    children: "Sample Button",
  },
};
