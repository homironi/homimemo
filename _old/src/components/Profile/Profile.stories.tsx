import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Profile } from "./index";

const meta = {
  component: Profile,
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {};
