import type { Meta, StoryObj } from "@storybook/react";
import { H2 } from "./H2";

const meta: Meta<typeof H2> = {
  title: "Components/H2",
  component: H2,
  parameters: {
    layout: "centered",
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
    children: "これは非常に長いテキストを含む見出しで、吹き出しデザインの表示を確認するためのものです",
  },
};
