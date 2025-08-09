import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";
import { loadSvgAsElement } from "../shared/svgLoader";
import "./codeBlock.css";
import "./copyButton.css";

const codeContainerClassName = "code-container";
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
      const toolContainer: Element = {
        type: "element",
        tagName: "div",
        properties: {
          className: [
            codeToolContainerClassName,
            `${codeToolContainerClassName}--${lang}`],
        },
        children: [],
      };

      const codeContainer: Element = {
        type: "element",
        tagName: "div",
        properties: {
          className: [
            codeContainerClassName,
            `${codeContainerClassName}--${lang}`],
        },
        children: [toolContainer, pre],
      };

      parent.children.splice(index, 1, codeContainer);
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
        parent?.type === "element"
        && parent.tagName === "div"
        && Array.isArray(parent.properties?.className)
        && parent.properties.className.includes(codeContainerClassName)
        && node?.type === "element"
        && node.tagName === "div"
        && Array.isArray(node.properties?.className)
        && node.properties.className.includes(codeToolContainerClassName)
      ) {
        const target = parent.children.find(child => child.type === "element"
          && child.tagName === "pre"
          && Array.isArray(child.properties?.className),
        );

        if (target && target.type === "element") {
          const targetId = `code-${uid++}`;
          target.properties = { ...target.properties, id: targetId };

          inserts.push({
            container: node,
            targetId: targetId,
          });
        }
      }
    });

    for (const { container, targetId } of inserts) {
      // SVGアイコンを読み込み
      const iconElement = loadSvgAsElement(
        "src/assets/icons/google-materials/content_copy_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg",
        "copy-btn-icon",
      );

      const buttonNode: Element = {
        type: "element",
        tagName: "button",
        properties: {
          className: ["copy-btn"],
          type: "button",
          "data-copy-target": `#${targetId}`,
        },
        children: [iconElement],
      };

      container.children.unshift(buttonNode);
    }
  };
}
