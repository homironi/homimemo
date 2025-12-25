import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AffiliateLink, AffiliateLinkProps } from "./index";

const meta = {
  component: AffiliateLink,
} satisfies Meta<typeof AffiliateLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const args : AffiliateLinkProps = {
  links: {
    amazon: "https://example.com/Amazonのリンク",
    rakuten: "https://example.com/楽天のリンク",
    yahoo: "https://example.com/Yahoo!ショッピングのリンク"
  },
  name: "名前",
  imageLink: "https://placehold.jp/150x150.png",
};

export const Sample: Story = {
  args: args,
};

export const LongName: Story = {
  args: {
    ...args,
    name: "これは長い名前が入っても問題ないかどうかを確認するための長い名前のサンプルです"
  },
};

export const NoImage: Story = {
  args: {
    links: args.links,
    name: "画像なしサンプルの名前",
  },
};

export const OnlyAmazonLink: Story = {
  args: {
    links: {
      amazon: "https://example.com/Amazonのリンク",
    },
    name: "Amazonのリンクのみのサンプルの名前",
    imageLink: "https://placehold.jp/150x150.png",
  },
};

export const OnlyRakutenLink: Story = {
  args: {
    links: {
      rakuten: "https://example.com/楽天のリンク",
    },
    name: "楽天のリンクのみのサンプルの名前",
    imageLink: "https://placehold.jp/150x150.png",
  },
};

export const OnlyYahooLink: Story = {
  args: {
    links: {
      yahoo: "https://example.com/Yahoo!ショッピングのリンク"
    },
    name: "Yahoo!ショッピングのリンクのみのサンプルの名前",
    imageLink: "https://placehold.jp/150x150.png",
  },
};
