---
title: vercel devの際にローカルで環境変数を指定したい！
description:
headerImg: /images/header/categories/makeWeb/5.webp
date: 2025-03-02
eleventyNavigation:
    key: vercel devの際にローカルで環境変数を指定したい！
    parent: Web制作
eleventyComputed:
tags:
    - Vercel
---

## はじめに

Vercel Functions を使ってサーバーレス関数で DB 接続を行っています。

その際に、ローカルでは localhost でたてた PostgreSQL に接続するようにしたい、ということがありました。  
その時にぶつかった問題の解決メモです。

## 環境

-   ホスティング：Vercel
-   サーバーレス関数：Vercel Functions（Go）
-   フロントエンド：Next.js
-   DB：PostgreSQL  
    （本番は Neon、ローカルでは localhost の PostgreSQL）

## 先に解決方法

`.env`ファイルを使うことで、ローカルでは`.env`の内容が使用されます。

`.env`ファイルを使用する場合は、環境変数全てを記載する必要があります。  
Vercel で設定している環境変数の存在自体が`.env`の内容に置き換わります。

`.env`にない環境変数は未定義になるので注意です！

※`.env`は機密の塊なので`.gitignore`に追加し、絶対にコミットなどをしないようにしてください！
{.text-block .text-block--error}

## なにで困った？

環境変数で DB の接続 URL を設定していたので、環境変数のローカルでの出し分けに困りました。  
ずっと`next dev` を使っており`.env.local`を使用していたので`.env`を使えばいける、という単純なところに気づきませんでした。

## まとめ

`vercel dev`で実行する際の環境変数は`.env`で変更できることがわかりました！

`vercel dev`だと環境変数をメモリに自動で読み込んでくれる、というありがたい仕様があり、それで少し悩みました。  
解決できてよかったです！

## 参考

-   [Local Development Environments](https://vercel.com/docs/deployments/local-env){target=blank .external-link}

