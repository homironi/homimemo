import type { Root } from "hast";
import { visit } from "unist-util-visit";
import "./index.css"; // TODO: module.cssに置き換える

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
        // TODO: module.cssに置き換える
        const additionalClassName = node.properties.checked ? "task-list-item-checked" : "";
        parent.properties = {
          ...parent.properties,
          className: [
            ...parent.properties.className,
            additionalClassName,
          ],
        };

        parent.children.splice(index, 1);
      }
    });
  };
}
