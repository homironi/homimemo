[![Add Missing Article IDs](https://github.com/homironi/homimemo/actions/workflows/add-article-missing-id.yml/badge.svg)](https://github.com/homironi/homimemo/actions/workflows/add-article-missing-id.yml)
[![Lint test](https://github.com/homironi/homimemo/actions/workflows/lint-test.yml/badge.svg)](https://github.com/homironi/homimemo/actions/workflows/lint-test.yml)

ほみの個人サイトのリポジトリです。  
https://homironi.com/

## 技術スタック

- Next.js
- TypeScript
- markdown

[![Built with Cloudflare](https://workers.cloudflare.com/built-with-cloudflare.svg)](https://cloudflare.com)

▼ developのStorybook  
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://develop--682bb6b6fbdc8489c7635afb.chromatic.com)

## 実行方法

1. 依存関係の install  
   ```cli
   pnpm install --frozen-lockfile
   ```
1. ローカルで起動  
   ```cli
   pnpm run dev
   ```

## フォルダ構成

```txt
/
├─ _contents                            ← 記事などのデータの保存フォルダ
│  ├─ articles                          ← 記事マークダウンフォルダ
│  └─ tags                              ← 記事のタグデータ
│
├─ _public                              ← Next.js のビルド先フォルダ：これを公開するがgitでは管理外に指定
├─ public                               ← Next.jsの静的アセットフォルダ
├─ scripts                              ← GitHubActions や pnpm run などで使用するスクリプト
└─ src
   ├─ app                               ← Next.js の AppRouter
   │  ├─ page.tsx                       ← Next.js の AppRouter のページ
   │  ├─ _components                    ← ./page.tsx 以下でのみ使用するComponentのフォルダ（以下共有Componentフォルダと同じ）
   │  └─ hoge                           ← `/hoge/`のルーティングフォルダ
   │     ├─ _components                 ← ./page.tsx 以下でのみ使用するComponentのフォルダ（以下共有Componentフォルダと同じ）
   │     └─ page.tsx                    ← `/hoge/`のページ
   │
   ├─ components                        ← 複数画面で使用するComponentフォルダ
   │  └─ HogeComponet                   ← 各Cpmponentフォルダ
   │     ├─ index.ts                    ← `export * from "./HogeComponent"`
   │     ├─ HogeComponet.tsx            ← `export function HogeComponent`
   │     ├─ HogeComponent.module.css    ← HogeComponentのmodule.css
   │     ├─ HogeComponent.stories.tsx   ← HogeComponentのStorybook
   │     └─ HogeComponent.test.ts       ← HogeComponentのテスト
   │
   ├─ lib                               ← 複数画面で使用するts のみのロジックファイル
   └─ schemas                           ← 複数画面で使用する型検証スキーマ＆型
```

### ビルド時限定フォルダ

ビルド時のみ使用できるもののフォルダ名は`_buildtime`。  
主に`fs`などランタイムで動作しないものを使用している場合に`_buildtime`以下に格納する。

例：
- `src/components/_buildtime/HogeComponent`
- `src/app/hoge/_components/_buildtime/HogeComponent`
- `src/lib/_buildtime/hoge`

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
