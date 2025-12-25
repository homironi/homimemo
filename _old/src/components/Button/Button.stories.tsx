import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContentCopyIcon } from "@/assets/icons";
import { Button } from "./index";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

export const Filled: Story = {
  args: {
    children: "Filled Button",
    variant: "filled",
  },
};

export const Outlined: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
  },
};

export const TextButton: Story = {
  args: {
    children: "Text Button",
    variant: "text",
  },
};

export const IconButton: Story = {
  args: {
    children: <ContentCopyIcon style={ {width: 24,} } />,
    variant: "text",
  },
};
