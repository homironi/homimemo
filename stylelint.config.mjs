/* eslint-disable jsdoc/check-tag-names */

/** @type {import("stylelint").Config} */

export default {
  extends: ["stylelint-config-standard"],
  referenceFiles: "src/layout/_globalElement.css",
  rules: {
    "color-function-alias-notation": "with-alpha",
    "color-hex-length": "long",
    "custom-property-empty-line-before": [
      "always",
      {
        except: [
          "after-custom-property",
          "first-nested",
        ],
      },
    ],
    "no-unknown-custom-properties": true,
  },
};
