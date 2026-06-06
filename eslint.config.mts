import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import { importX } from "eslint-plugin-import-x";
import jsdocPlugin from "eslint-plugin-jsdoc";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

// js/ts/astro共通のプラグインとルール
const commonPluginsAndRules = {
  plugins: {
    "@stylistic": stylistic,
    jsdocPlugin,
    "unused-imports": unusedImports,
  },
  rules: {
    "no-console": "error",
    "@stylistic/indent": ["error", 2],
    "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/linebreak-style": ["error", "unix"],
    "@stylistic/quote-props": ["error", "as-needed"],
    "jsdoc/require-jsdoc": ["error", { publicOnly: true }],

    // unused-imports/no-unused-varsに任せるので無効化
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // Astro関係は除外
    "import-x/no-unresolved": [
      "error",
      { ignore: ["^astro:"] },
    ],
    "import-x/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: "@/**",
            group: "parent",
            position: "before",
          },
        ],
      },
    ],
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
  jsdocPlugin.configs["flat/recommended-typescript"],
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
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
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    ...commonPluginsAndRules,
  },
  {
    files: ["scripts/**/*.{js,ts}"],
    rules: {
      "no-console": "off",
    },
  },
]);
