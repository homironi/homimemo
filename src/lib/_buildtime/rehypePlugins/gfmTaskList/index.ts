import type { Root } from "hast";
import { visit } from "unist-util-visit";
import { loadSvgAsElement } from "../shared/svgLoader";
import "./index.css";

const taskListItemClassName = "task-list-item";

/**
 * GitHub Flavored Markdown のタスクリストをカスタムする Rehype プラグイン
 * @returns Rehype プラグイン
 */
export function rehypeGfmTaskList() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "input"
        && parent?.type === "element"
        && parent.tagName === "li"
        && Array.isArray(parent.properties.className)
        && parent.properties.className.includes(taskListItemClassName)
        && index !== undefined
      ) {
        const isChecked = Boolean(node.properties.checked);

        // SVGアイコンを読み込み
        const iconElement = loadSvgAsElement(
          isChecked
            ? "src/assets/icons/google-materials/check_box_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
            : "src/assets/icons/google-materials/check_box_outline_blank_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg",
          isChecked ? "task-list-checkbox-checked" : "task-list-checkbox-unchecked",
        );

        // 親liにクラスを追加
        const additionalClassName = isChecked ? "task-list-item-checked" : "task-list-item-unchecked";
        parent.properties = {
          ...parent.properties,
          className: [
            ...parent.properties.className,
            additionalClassName,
          ],
        };

        // inputタグをSVGアイコンに置き換え
        parent.children.splice(index, 1, iconElement);
      }
    });
  };
}
