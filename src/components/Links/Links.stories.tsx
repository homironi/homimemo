import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Links } from "./index";

const meta = {
  component: Links,
} satisfies Meta<typeof Links>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "default",
  },
  render: (args) => (
    <div style={{ backgroundColor: "var(--color-main)", padding: "16px" }}>
      <Links {...args} />
    </div>
  ),
};

export const Reverse: Story = {
  args: {
    color: "reverse",
  },
  render: (args) => (
    <div
      style={{ backgroundColor: "var(--color-main-reverse)", padding: "16px" }}
    >
      <Links {...args} />
    </div>
  ),
};

export const White: Story = {
  args: {
    color: "white",
  },
  render: (args) => (
    <div
      style={{ backgroundColor: "var(--color-main-black)", padding: "16px" }}
    >
      <Links {...args} />
    </div>
  ),
};

export const Black: Story = {
  args: {
    color: "black",
  },
  render: (args) => (
    <div
      style={{ backgroundColor: "var(--color-main-white)", padding: "16px" }}
    >
      <Links {...args} />
    </div>
  ),
};
