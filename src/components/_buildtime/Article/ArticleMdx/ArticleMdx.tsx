import { ArticleDiv } from "@/components/_buildtime/Article/ArticleDiv";
import { ArticleH2 } from "@/components/_buildtime/Article/ArticleH2";
import { ArticleParagraph } from "@/components/_buildtime/Article/ArticleParagraph";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ExternalLink } from "@/components/ExternalLink";
import { H3 } from "@/components/H3";
import { TextBlock } from "@/components/TextBlock";
import { rehypeCodeContainer } from "@/lib/_buildtime/rehypePlugins/code";
import { rehypeGfmTaskList } from "@/lib/_buildtime/rehypePlugins/gfmTaskList";
import { MDXRemote } from "next-mdx-remote/rsc";
import React, { PropsWithChildren } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import "../blockquote.css"; // 引用のスタイルを適用するためにインポート
import "../inlineCode.css"; // インラインコードのスタイルを適用するためにインポート
import "../list.css";
import "../prism.css"; // 記事内で使用するコードハイライトのPrismのスタイルを適用するためにインポート
import "../table.css";
import styles from "./ArticleMdx.module.css";

export type ArticleMdxProps = {
  isArticle : boolean;
  className?: string;
  content: string;
  tocContentSourceIdName: string;
};

/**
 * 見出しコンポーネントのファクトリー関数
 * @param Tag 見出しタグ名
 * @returns 見出しコンポーネント
 */
function createHeadingComponent(Tag: "h1" | "h4" | "h5" | "h6") {
  return function HeadingComponent({
    children,
    className,
    ...props
  }: PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
    const processedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === ExternalLink) {
        const {
          href,
          children: childChildren,
          ...anchorProps
        } = child.props as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
          children?: React.ReactNode;
        };
        return (
          <a href={ href } { ...anchorProps }>
            {childChildren}
          </a>
        );
      }
      return child;
    });

    return <Tag { ...props } className={ `${className} ${styles.heading}` }>{processedChildren}</Tag>;
  };
}

/**
 * 記事ページコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.content 記事のMDXコンテンツ
 * @param root0.tocContentSourceIdName 目次のコンテンツソースとして扱う目印のID名
 * @param root0.className クラス名
 * @param root0.isArticle 通常の記事かどうか。固定記事なら false
 * @returns 記事ページのコンポーネント
 */
export function ArticleMdx({
  isArticle,
  className,
  content,
  tocContentSourceIdName,
}: ArticleMdxProps) {
  return (
    <article id={ tocContentSourceIdName } className={ className ?? "" }>
      <MDXRemote
        source={ content }
        components={ {
          p: ArticleParagraph,
          a: ExternalLink,
          h1: createHeadingComponent("h1"),
          h2: props => ArticleH2({visibleAdSense:isArticle, ...props}),
          h3: H3,
          h4: createHeadingComponent("h4"),
          h5: createHeadingComponent("h5"),
          h6: createHeadingComponent("h6"),
          div: ArticleDiv,
          TextBlock,
          AffiliateLink,
        } }
        options={ {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              () => rehypeAutolinkHeadings({behavior: "wrap"}),
              rehypeCodeTitles,
              [rehypePrism],
              rehypeCodeContainer,
              rehypeGfmTaskList,
            ],
          },
        } }
      />
    </article>
  );
}
