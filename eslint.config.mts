import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  {
    ignores: [
      "**/*.css.d.ts", // CSSの型定義は自動生成なので無視
      "_public/**",
      "**/node_modules/**",
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