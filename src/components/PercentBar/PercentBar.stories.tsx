import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PercentBar } from "./index";

const meta = {
  component: PercentBar,
} satisfies Meta<typeof PercentBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {
  args: {
    max: 100,
    current: 60,
  },
};

export const Max: Story = {
  args: {
    max: 100,
    current: 100,
  },
};
