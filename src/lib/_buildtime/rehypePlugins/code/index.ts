import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";
import "./codeBlock.css";
import "./copyButton.css";

export const codeContainerClassName = "code-container";

/**
 * <pre class="language-xxx"> … </pre> を包む<div> を差し込む Rehype プラグイン
 * @returns Rehype プラグイン
 */
export function rehypeCodeContainer() {
  return (tree: Root) => {
    type Target = {
      parent: Element;
      index: number;
      pre: Element;
      lang?: string;
      title?: Element;
    };
    const targets: Target[] = [];

    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "pre"
        && index
        && parent
      ) {
        const classNames = Array.isArray(node.properties.className) ? node.properties.className as string[] : undefined;
        const langClass = classNames?.find(c => c.startsWith("language-"));
        const target: Target = {
          parent: parent as Element,
          index: index,
          pre: node,
          lang: langClass?.replace("language-", ""),
        };
        
        // 直前のノードがタイトルならそれを取得する
        if (index > 0) {
          const prevNode = parent.children[index - 1];
          
          if (prevNode
            && prevNode.type === "element"
            && prevNode.tagName === "div"
            && (prevNode.properties.className as string[]).includes("rehype-code-title")
          ) {
            target.title = prevNode;
          }
        }

        targets.push(target);
      }
    });

    for (const { pre, parent, index, lang, title } of targets) {
      const children: Element[] = [pre];
      if (title) {
        children.unshift(title);
      }

      const codeContainer: Element = {
        type: "element",
        tagName: "div",
        properties: {
          className: [
            codeContainerClassName,
            `${codeContainerClassName}--${lang ?? ""}`],
        },
        children,
      };

      parent.children.splice(index, 1, codeContainer);
    }

    for (const { parent, index, title } of targets.toReversed()) {
      // タイトルがある時は重複しないように子にしなかった方を削除
      if(title){
        parent.children.splice(index - 1, 1);
      }
    };
  };
}