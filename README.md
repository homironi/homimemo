▼ developのStorybook（Private）  
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://develop--682bb6b6fbdc8489c7635afb.chromatic.com)

[![Add Missing Article IDs](https://github.com/mimimiRoni/homimemo/actions/workflows/add-article-missing-id.yml/badge.svg)](https://github.com/mimimiRoni/homimemo/actions/workflows/add-article-missing-id.yml)
[![Build test](https://github.com/mimimiRoni/homimemo/actions/workflows/build-test.yml/badge.svg)](https://github.com/mimimiRoni/homimemo/actions/workflows/build-test.yml)
[![Lint test](https://github.com/mimimiRoni/homimemo/actions/workflows/lint-test.yml/badge.svg)](https://github.com/mimimiRoni/homimemo/actions/workflows/lint-test.yml)

ほみの個人サイトのリポジトリです。  
https://homironi.com/

## 技術スタック

- Next.js
- TypeScript
- DecapCMS
- markdown

## コード規約

基本はLinterで設定する。

### Next.jsの`dynamic`ではデフォルトimportでも`then`で名前付きimportをする

VS Codeでの全参照検索で参照に含まれるようにするため。  
OKパターンの場合は参照箇所として出てくる。  
NGパターンでは参照箇所として引っかからない。

▼ OK  
```ts
const DynamicToc = dynamic(() => import("@/components/TableOfContents").then(mod => mod.default));
```

▼ NG  
```ts
const DynamicToc = dynamic(() => import("@/components/TableOfContents"));
```

https://nextjs-ja-translation-docs.vercel.app/docs/advanced-features/dynamic-import

## フォルダ構成

```txt
/
├─ _contents                            ← DecapCMSで作成するデータの保存フォルダ
│  ├─ articles                          ← 記事マークダウンフォルダ
│  ├─ categories                        ← 記事のカテゴリデータ
│  └─ tags                              ← 記事のタグデータ
│
├─ _public                              ← Next.js のビルド先フォルダ：これを公開する
├─ public                               ← Next.jsの静的アセットフォルダ
├─ scripts                              ← GitHubActions や npm run などで使用するスクリプト
└─ src                                  
   ├─ components                        ← すべてのコンポーネントのフォルダ
   │  └─ HogeComponet                   ← 各コンポーネントフォルダ
   │     ├─ index.ts                    ← `export * from "./HogeComponent"`
   │     ├─ HogeComponet.tsx            ← `export function HogeComponent`
   │     ├─ HogeComponent.module.css    ← HogeComponentのmodule.css
   │     ├─ HogeComponent.stories.tsx   ← HogeComponentのStorybook
   │     └─ HogeComponent.test.ts       ← HogeComponentのテスト
   │
   ├─ app                               ← Next.js の AppRouter
   │  └─ page.tsx                       ← Next.js の AppRouter のページ
   │
   ├─ lib                               ← ts のみのロジックファイル
   └─ schemas                           ← 型検証スキーマ＆Valibotによる型
```

### `src/components`フォルダ

componentはこのフォルダの中にいれる。

`/components/[componentフォルダ名]` の中に component の定義などをまとめる
