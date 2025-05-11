import { FlatCompat } from "@eslint/eslintrc";
import stylistic from "@stylistic/eslint-plugin";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  stylistic.configs.customize({
    semi: true,
    quotes: "double",
  }),
  {
    rules: {
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/jsx-curly-spacing": [2, { when: "always" }],
      "@stylistic/jsx-self-closing-comp": ["error", {
        component: true,
        html: true,
      }],
    },
  },
];

export default eslintConfig;
