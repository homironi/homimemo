import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import typescriptEslintParser from "@typescript-eslint/parser";
import type { Linter } from "eslint";

// js/ts/astro共通のプラグインとルール
const commonPluginsAndRules = {
  plugins: {
    "@stylistic": stylistic,
    jsdoc,
  },
  rules: {
    "no-console": "error",
    "@stylistic/indent": ["error", 2],
    "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/linebreak-style": ["error", "unix"],
    "@stylistic/quote-props": ["error", "as-needed"],
    "jsdoc/require-jsdoc": ["error", { publicOnly: true }],
  },
} satisfies Partial<Linter.Config>;

export default defineConfig([
  {
    ignores: [
      "**/*.css.d.ts",
      "_public/**",
      "**/node_modules/**",
      ".astro/**",
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs.recommended,
  eslintPluginAstro.configs["flat/recommended"],
  jsdoc.configs["flat/recommended-typescript"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: [".astro"],
      },
    },
    ...commonPluginsAndRules,
    rules: {
      ...commonPluginsAndRules.rules,
      // AstroはJSXではないのでJSX系ルールをすべてオフ
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/jsx-tag-spacing": "off",
      "@stylistic/jsx-indent": "off",
      "@stylistic/jsx-curly-spacing": "off",
      "@stylistic/max-statements-per-line": "off",
      // Astroのindentはeslint-plugin-astro側に任せる
      "@stylistic/indent": "off",
      "astro/jsx-a11y/no-redundant-roles": "off",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ...commonPluginsAndRules,
  },
  {
    files: ["scripts/**/*.{js,ts}"],
    rules: {
      "no-console": "off",
    },
  },
]);
