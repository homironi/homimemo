// https://github.com/svg/svgo
// https://techshed.runbookdocs.com/docs/tips/2/optimize-svg

function addClassToElement(node, classNames) {
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

module.exports = {
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
      name: "removeDimensions",
    },
    {
      name: "addFillNoneCss",
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
        attrs: "(stroke)",
      },
    },
  ],
};
