import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TableOfContents } from "./index";

const meta = {
  component: TableOfContents,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

const tocContentSourceIdName = "toc-source-content";

export const Sample: Story = {
  args: {
    tocContentSourceIdName,
  },
  render: () => (
    <>
      <TableOfContents tocContentSourceIdName={tocContentSourceIdName} />
      <p>以下は目次の内容です</p>
      <hr />
      <article id={tocContentSourceIdName}>
        <h2>見出し2です</h2>
        <h2>見出し2です</h2>
        <h2>見出し2です</h2>
        <h2>見出し2です</h2>
        <h2>見出し2です</h2>
        <h2>見出し2です</h2>
        <h2>見出し2です</h2>
        <h3>見出し3です</h3>
        <h3>見出し3です</h3>
        <h3>見出し3です</h3>
        <h4>見出し4です</h4>
        <h5>見出し5です</h5>
        <h2>見出し2です</h2>
        <h2>見出し2です</h2>
      </article>
    </>
  ),
};
