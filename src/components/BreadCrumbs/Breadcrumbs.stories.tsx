import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Breadcrumbs } from "./index";

const meta = {
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
};
