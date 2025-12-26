import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "**/*.css.d.ts", // CSSの型定義は自動生成なので無視
      "_public/**",
      "**/node_modules/**",
      "_old", // 一時的に用意している古いコード置き場
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      "@stylistic": stylistic,
      jsdoc,
    },
    rules: {
      "no-console": "error",
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "jsdoc/require-jsdoc": ["error", { publicOnly: true }],
    },
  },
  {
    // ビルド時やGitHubActionsなどで使用するので、ログ出力を使うためConsole.logなどは許可する
    files: [
      "scripts/**/*.{js,ts}",
    ],
    rules: {
      "no-console": "off", // consoleを許可
    },
  },
  jsdoc.configs["flat/recommended-typescript"],
]);