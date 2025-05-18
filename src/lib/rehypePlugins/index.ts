import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

const codeToolContainerClassName = "code-tools-container";

/**
 * <pre class="language-xxx"> … </pre> を包む toolContainer の <div> を差し込む Rehype プラグイン
 * @returns Rehype プラグイン
 */
export function rehypeCodeToolContainer() {
  return (tree: Root) => {
    type Target = {
      parent: Element;
      index: number;
      pre: Element;
      lang: string;
    };
    const targets: Target[] = [];

    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "pre"
        && Array.isArray(node.properties.className)
      ) {
        const classNames = node.properties.className as string[];
        const langClass = classNames.find(c => c.startsWith("language-"));
        if (langClass) {
          targets.push({
            parent: parent as Element,
            index: index as number,
            pre: node,
            lang: langClass.replace("language-", ""),
          });
        }
      }
    });

    for (const { pre, parent, index, lang } of targets) {
      const container: Element = {
        type: "element",
        tagName: "div",
        properties: {
          className: [
            codeToolContainerClassName,
            `${codeToolContainerClassName}--${lang}`],
        },
        children: [pre],
      };

      parent.children.splice(index, 1, container);
    }
  };
}

/**
 * CodeToolContainer の直下に言語名を差し込む Rehype プラグイン
 * @returns Rehype プラグイン
 * @see rehypeCodeToolContainer でコンテナが追加されていればその中に追加される
 */
export function rehypeCodeLangLabel() {
  return (tree: Root) => {
    const inserts: Element[] = [];

    visit(tree, "element", (node) => {
      if (
        node.tagName === "div"
        && Array.isArray(node.properties.className)
        && node.properties.className.includes(codeToolContainerClassName)
      ) {
        inserts.push(node);
      }
    });

    for (const container of inserts) {
      const langMatch = (container.properties!.className as string[]).find(c =>
        c.startsWith(`${codeToolContainerClassName}--`),
      );
      const lang = langMatch?.replace(`${codeToolContainerClassName}--`, "") ?? "";
      const label: Element = {
        type: "element",
        tagName: "span",
        properties: { className: ["code-lang"] },
        children: [{ type: "text", value: lang }],
      };
      container.children.unshift(label);
    }
  };
}

/**
 * CodeToolContainer の直下に Copy ボタンを差し込む Rehype プラグイン
 * @returns Rehype プラグイン
 * @see rehypeCodeToolContainer でコンテナが追加されていればその中に追加される
 */
export function rehypeCopyButton() {
  return (tree: Root) => {
    const inserts: {
      container: Element;
      targetId: string;
    }[] = [];
    let uid = 0;

    visit(tree, "element", (node, _, parent) => {
      if (
        node?.type === "element"
        && node.tagName === "pre"
        && parent?.type === "element"
        && parent.tagName === "div"
        && Array.isArray(parent.properties?.className)
        && parent.properties.className.includes(codeToolContainerClassName)
      ) {
        const targetId = `code-${uid++}`;
        node.properties = { ...node.properties, id: targetId };

        inserts.push({
          container: parent,
          targetId: targetId,
        });
      }
    });

    for (const { container, targetId } of inserts) {
      const buttonNode: Element = {
        type: "element",
        tagName: "button",
        properties: {
          className: ["copy-btn"],
          type: "button",
          "data-copy-target": `#${targetId}`,
        },
        children: [{ type: "text", value: "Copy" }],
      };

      container.children.unshift(buttonNode);
    }
  };
}
