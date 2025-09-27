import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ErrorPage } from "./ErrorPage";

const meta: Meta<typeof ErrorPage> = {
  component: ErrorPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorCode: "404",
    errorTitle: "Not Found",
    errorMessage: "ページが削除された可能性があります。",
  },
};
