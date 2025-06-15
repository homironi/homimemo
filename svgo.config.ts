// https://techshed.runbookdocs.com/docs/tips/2/optimize-svg

import type { Config } from "svgo";
import { XastElement } from "svgo/lib/types";

function addClassToElement(node: XastElement, classNames: string[]) {
  const classList = new Set(
    node.attributes.class == null ? null : node.attributes.class.split(" "),
  );
  for (const className of classNames) {
    if (className != null) {
      classList.add(className);
    }
  }
  node.attributes.class = Array.from(classList).join(" ");
}

const svgoConfig: Config = {
  plugins: [
    {
      name: "preset-default",
    },
    {
      name: "convertStyleToAttrs",
    },
    {
      name: "cleanupListOfValues",
    },
    {
      name: "sortAttrs",
    },
    {
      name: "removeStyleElement",
    },
    {
      name: "removeScriptElement",
    },
    {
      name: "addFillNoneCss",
      // カスタムプラグインの fn の型は SVGO の PluginDefinition に従う
      fn: () => {
        return {
          element: {
            enter: (node) => {
              const attrNames = Object.keys(node.attributes);
              attrNames.forEach((name) => {
                const value = node.attributes[name];
                if (name === "fill") {
                  if (value === "none") {
                    addClassToElement(node, ["icon-fill-none"]);
                  }
                  delete node.attributes["fill"];
                }
              });
            },
          },
        };
      },
    },
    {
      name: "removeAttrs",
      params: {
        attrs: "stroke", // "()" は不要
      },
    },
  ],
};

export default svgoConfig;
