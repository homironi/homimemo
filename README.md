▼ developのStorybook（Private）  
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://develop--682bb6b6fbdc8489c7635afb.chromatic.com)

ほみの個人サイトのリポジトリです。

## 技術スタック

- Next.js
- TypeScript
- DecapCMS
- markdown

## Linterで設定できないコード規約

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
