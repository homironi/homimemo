import { CardPreviewUrl } from "@/components/server/CardPreviewUrl";
import React, { PropsWithChildren } from "react";
import { object, pipe, safeParse, string, url } from "valibot";

const childrenAnchorPropsSchema = object({
  children: pipe(string(), url()),
  href: pipe(string(), url()),
});

/**
 * 記事用にカスタムしたp要素
 * @param root0 引数オブジェクト
 * @param root0.children 子要素
 * @returns 記事用にカスタムしたp要素
 */
export function ArticleParagraph({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) {
  // 子要素が1つのテキストノードで、それがURLの場合はカード表示する
  if (
    children &&
    React.Children.count(children) === 1 &&
    typeof children === "object" &&
    React.isValidElement(children)
  ) {
    const validatedChildrenProps = safeParse(
      childrenAnchorPropsSchema,
      children.props
    );
    if (validatedChildrenProps.success) {
      const { href } = validatedChildrenProps.output;
      const trimmedHref = href.trim();
      return <CardPreviewUrl url={ trimmedHref } />;
    }
  }

  return <p { ...props }>{children}</p>;
};
