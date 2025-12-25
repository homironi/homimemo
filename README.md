ほみの個人サイトのリポジトリです。  
https://homironi.com/

## 技術スタック

- Astro
- TypeScript
- markdown

[![Built with Cloudflare](https://workers.cloudflare.com/built-with-cloudflare.svg)](https://cloudflare.com)

## 実行方法

1. 依存関係の install  
   ```cli
   pnpm install --frozen-lockfile
   ```
1. ローカルで起動  
   ```cli
   pnpm run dev
   ```

## scripts

|scripts|内容|
|--|--|
|`pnpm dev`|ローカルで起動|
|`pnpm build`|ビルド|
|`pnpm preview`|本番環境に近めのプレビューとして起動|
|`pnpm astro`|Astro|
|`pnpm lint`|コードの整形ルール違反確認|
|`pnpm lint-fix`|コードの整形ルール違反の自動修正可能なものを自動修正|
|`pnpm svg`|`/src/assets/icons`以下のSVGを最適化する（色なしなどになるので注意）|

## フォルダ構成

```txt
/
├─ _contents                            ← 記事などのデータの保存フォルダ
│  ├─ articles                          ← 記事マークダウンフォルダ
│  └─ tags                              ← 記事のタグデータ
│
├─ _public                              ← ビルドの出力フォルダ：これを公開するがgitでは管理外に指定
├─ public                               ← 静的アセットフォルダ：このフォルダはそのままビルド時にルートに入る
├─ scripts                              ← GitHubActions や pnpm run などで使用するスクリプト
└─ src
   ├─ pages                             ← Astroのルーティングフォルダ
   │  ├─ index.astro                    ← Astroのページファイル
   │  ├─ _layout.astro                  ← レイアウトのAstroファイル：./index.astro 以下ではこれを使う
   │  ├─ _components                    ← ./index.astro 以下でのみ使用するComponentのフォルダ（以下共有Componentフォルダと同じ）
   │  └─ hoge                           ← 「/hoge/」のルーティングフォルダ
   │     ├─ _components                 ← ./index.astro 以下でのみ使用するComponentのフォルダ（以下共有Componentフォルダと同じ）
   │     └─ index.astro                 ← 「/hoge/」のページ
   │
   ├─ assets                            ← astroファイルなどでのみ使用するSVGアイコンアセットなどのフォルダ
   │  └─ icons                          ← 「astro-icon」のアイコンSVG用フォルダ：最適化の対象なので色などが変わるとまずいものはよそへ
   │
   ├─ components                        ← 複数画面で使用するComponentフォルダ
   │  └─ HogeComponet.astro             ← 各Component
   │
   ├─ lib                               ← 複数画面で使用するts のみのロジックファイル
   └─ schemas                           ← 複数画面で使用する型検証スキーマ＆型
```

## コード規約

基本はLinterで設定する。
