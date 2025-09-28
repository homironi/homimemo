import { CodeBlock } from "@/components/server/Article/CodeBlock";
import { codeContainerClassName } from "@/lib/server/rehypePlugins/code";
import { PropsWithChildren, isValidElement } from "react";

/**
 * <div> 要素を処理するコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.className クラス名
 * @param root0.children 子要素
 * @param root0.props その他のプロパティ
 * @returns <div> 要素のJSX要素
 */
export function ArticleDiv({className, children,...props}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  // コードブロックコンテナの処理
  if(className?.includes(codeContainerClassName)  && children){
    // childrenが配列の時はタイトル付きコードブロック
    if(Array.isArray(children) && children.length >= 2){
      const childrenArray = children as React.ReactNode[];
      const titleElement = childrenArray[0] as React.ReactHTMLElement<HTMLDivElement>;
      const title = titleElement.props.children?.toString();
      const preElement = childrenArray[1] as React.ReactHTMLElement<HTMLPreElement>;
      return (
        <div className={ className } { ...props }>
          <CodeBlock title={ title } { ...preElement.props } />
        </div>
      );
    }
    else if(isValidElement(children) && children.type === "pre"){
      // タイトルなしコードブロック
      const childrenElement = children as React.ReactHTMLElement<HTMLPreElement>;
      return (
        <div className={ className } { ...props }>
          <CodeBlock { ...childrenElement.props } />
        </div>
      );
    }
  }

  return <div className={ className } { ...props } >{children}</div>;
}
