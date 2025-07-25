import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/*.css.d.ts", // CSSの型定義は自動生成なので無視
    ],
  },
  jsdoc.configs["flat/recommended-typescript"],
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  stylistic.configs.customize({
    semi: true,
    quotes: "double",
  }),
  {
    plugins: {
      "@stylistic": stylistic,
      jsdoc,
    },
    rules: {
      "no-console": "error",
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/jsx-curly-spacing": [2, { when: "always" }],
      "@stylistic/jsx-self-closing-comp": ["error", {
        component: true,
        html: true,
      }],
      "jsdoc/require-jsdoc": ["error", { publicOnly: true }],
    },
  },
];

export default eslintConfig;
