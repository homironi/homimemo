import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TextBlock } from "./index";

const meta = {
  title: "Components/TextBlock",
  component: TextBlock,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    blockType: {
      control: { type: "select" },
      options: [
        "info",
        "warning",
        "error",
        "success",
        "note",
        "tip",
        "question",
      ],
    },
    titleLevel: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
  },
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    blockType: "info",
    title: "情報",
    children:
      "これは情報を表示するためのTextBlockです。重要な情報やお知らせを読者に伝える際に使用します。",
  },
};

export const Warning: Story = {
  args: {
    blockType: "warning",
    title: "注意",
    children:
      "これは注意を促すためのTextBlockです。読者が注意すべき事項や気をつけるべき点を伝える際に使用します。",
  },
};

export const Error: Story = {
  args: {
    blockType: "error",
    title: "エラー",
    children:
      "これはエラーを表示するためのTextBlockです。問題やエラーについて読者に警告する際に使用します。",
  },
};

export const Success: Story = {
  args: {
    blockType: "success",
    title: "成功",
    children:
      "これは成功を表示するためのTextBlockです。正常に完了したタスクや良い結果を伝える際に使用します。",
  },
};

export const Note: Story = {
  args: {
    blockType: "note",
    title: "メモ",
    children:
      "これはメモを表示するためのTextBlockです。補足情報や覚えておくべき点を伝える際に使用します。",
  },
};

export const Tip: Story = {
  args: {
    blockType: "tip",
    title: "ヒント",
    children:
      "これはヒントを表示するためのTextBlockです。便利な機能や効率的な方法を読者に教える際に使用します。",
  },
};

export const Question: Story = {
  args: {
    blockType: "question",
    title: "質問",
    children:
      "これは質問を表示するためのTextBlockです。よくある質問やFAQを表示する際に使用します。",
  },
};

export const WithoutTitle: Story = {
  args: {
    blockType: "info",
    children:
      "タイトルなしのTextBlockの例です。シンプルな情報表示に適しています。",
  },
};

export const LongContent: Story = {
  args: {
    blockType: "warning",
    title: "長いコンテンツの例",
    children: (
      <div>
        <p>このTextBlockは複数の段落を含む長いコンテンツの例です。</p>
        <p>マークダウンから変換されたHTMLコンテンツも正しく表示されます。</p>
        <ul>
          <li>リストアイテム1</li>
          <li>リストアイテム2</li>
          <li>リストアイテム3</li>
        </ul>
        <p>コードブロックも含めることができます：</p>
        <pre>
          <code>console.log(&quot;Hello, World!&quot;);</code>
        </pre>
      </div>
    ),
  },
};

export const AllTypes: Story = {
  args: {
    blockType: "info",
    children: "This will be overridden by the render function",
  },
  render: () => (
    <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
      <TextBlock blockType="info" title="Info">
        情報ブロックの例（タイトルあり）
      </TextBlock>
      <TextBlock blockType="info">情報ブロックの例（タイトルなし）</TextBlock>

      <TextBlock blockType="warning" title="Warning">
        警告ブロックの例（タイトルあり）
      </TextBlock>
      <TextBlock blockType="warning">
        警告ブロックの例（タイトルなし）
      </TextBlock>

      <TextBlock blockType="error" title="Error">
        エラーブロックの例（タイトルあり）
      </TextBlock>
      <TextBlock blockType="error">
        エラーブロックの例（タイトルなし）
      </TextBlock>

      <TextBlock blockType="success" title="Success">
        成功ブロックの例（タイトルあり）
      </TextBlock>
      <TextBlock blockType="success">
        成功ブロックの例（タイトルなし）
      </TextBlock>

      <TextBlock blockType="note" title="Note">
        メモブロックの例（タイトルあり）
      </TextBlock>
      <TextBlock blockType="note">メモブロックの例（タイトルなし）</TextBlock>

      <TextBlock blockType="tip" title="Tip">
        ヒントブロックの例（タイトルあり）
      </TextBlock>
      <TextBlock blockType="tip">ヒントブロックの例（タイトルなし）</TextBlock>

      <TextBlock blockType="question" title="Question">
        質問ブロックの例（タイトルあり）
      </TextBlock>
      <TextBlock blockType="question">
        質問ブロックの例（タイトルなし）
      </TextBlock>
    </div>
  ),
};
