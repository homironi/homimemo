import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks"; // 追加
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
      ".next/**",
      "_public/**",
      "**/node_modules/**",
      "next-env.d.ts",
      "worker-configuration.d.ts",
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      "@stylistic": stylistic,
      jsdoc,
      react: pluginReact,
      "react-hooks": reactHooks, // 追加
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Next.jsでは不要
      "react/prop-types": "off", // TypeScriptを使用しているため
      
      ...reactHooks.configs.recommended.rules,
      
      "no-console": "error",
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/jsx-curly-spacing": [2, { when: "always" }],
      "@stylistic/jsx-self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
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