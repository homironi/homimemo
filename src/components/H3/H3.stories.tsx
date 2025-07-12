import type { Meta, StoryObj } from "@storybook/react";
import { H3 } from "./H3";

const meta: Meta<typeof H3> = {
  title: "Components/H3",
  component: H3,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "見出しのテキスト",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "これはH3見出しのテキストです",
  },
};

export const WithLink: Story = {
  args: {
    children: (
      <>
        見出しに
        <a href="#section">リンク</a>
        が含まれる場合
      </>
    ),
  },
};

export const LongText: Story = {
  args: {
    children: "これは非常に長いテキストを含む見出しで、下線スタイルの表示を確認するためのものです",
  },
};
