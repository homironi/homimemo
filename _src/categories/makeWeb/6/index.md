---
title: Vercel FunctionsとFirebaseAuthentication（Emulator）の認証トークンで詰まった話
description: ID token has no 'kid' header; see https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve a valid ID token というエラーを解決します！
headerImg: /images/header/categories/makeWeb/6.webp
date: 2025-03-02
eleventyNavigation:
    key: Vercel FunctionsとFirebaseAuthentication（Emulator）の認証トークンで詰まった話
    parent: Web制作
eleventyComputed:
    tags:
        - Vercel
        - FirebaseAuthentication
---

## はじめに

今回は以下のエラーを解決します。

```txt
ID token has no 'kid' header; see https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve a valid ID token
```

詳細は後述しますが、Firebase の設定の問題でありつつ、環境変数の設定の問題でした。

### やろうとしていたこと

フロントエンドからバックエンド（Vercel Functions）に認証トークンを送り、それをバックエンドで検証しようとしていました。

流れとしては以下のような感じです。

1. フロントエンドで認証トークンを取得
1. fetch の headers の Authorization に認証トークンをのせて送る
1. バックエンドで受け取った認証トークンを検証

ローカルでの確認方法は、`verce dev`コマンドを使用しています。（Vercel Functions 使用のため）
{.text-block .text-block--info}

## 環境

-   フロントエンド：Next.js、TypeScript
-   バックエンド：Vercel Functions（Go）
-   認証周り：FirebaseAuthentication
-   ローカルで FirebaseEmulator を使って動作確認中

## 先に結論

環境変数を`.env`に全て定義するか、環境変数 `FIREBASE_AUTH_EMULATOR_HOST` を Vercel でデプロイします！！！！

### `.env`でローカルでの環境変数を設定する場合

`.env`に`FIREBASE_AUTH_EMULATOR_HOST`の環境変数を設定します！

### 環境変数を Vercel に設定しているもので設定する場合

ローカルでの確認の場合も環境変数のデプロイをしないと認識されません。

`FIREBASE_AUTH_EMULATOR_HOST`の環境変数を追加したら一旦デプロイし直しましょう。  
今回は前の PR の Preview デプロイをデプロイし直して解決しました。

デプロイし直すのはなんでも OK です！
{.text-block .text-block--info}

## 起きていた問題

フロントエンドから受け取った認証トークンを検証すると、以下のエラーが出て認証が失敗していました。

```txt
ID token has no 'kid' header; see https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve a valid ID token
```

認証トークンの取得はログイン済ユーザーのトークンを FirebaseAuthentication から取得していました。

バックエンド側（Go）も FirebaseSDK を使って検証をしていました。

特に問題がないはずです。  
エラーに示されたリンクをみても手元でやっている内容でした。

## 解決する

調べていると、どうも Emulator での動作では kid がないのが通常らしい、ということがわかります。

そのため、`FIREBASE_AUTH_EMULATOR_HOST`を環境変数に定義していることで検証が通せるとのことでした。

```txt
FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099”
```

-   [https://github.com/firebase/firebase-tools/issues/2764](https://github.com/firebase/firebase-tools/issues/2764%E3%80%81https://github.com/firebase/firebase-tools/issues/5821){target=blank .external-link}
-   [https://github.com/firebase/firebase-tools/issues/5821](https://github.com/firebase/firebase-tools/issues/2764%E3%80%81https://github.com/firebase/firebase-tools/issues/5821){target=blank .external-link}

ということで Vercel に環境変数を追加し、ローカルでも`.env.local` に入れて「さあこれでよし」、と思ったものの同じエラーが出続けました。

再起動してみても変わりません。

ここで解決した方法は Vercel のデプロイのし直しです！

そうです。  
Vercel でデプロイし直していなかったことによって、環境変数を認識できない状態になっていました。

これでやっと認証の検証が成功するようになり、無事解決しました。

これまで`vercel dev`ではなく`next dev`でローカルでの確認をしていたので、起きた問題でした。  
[こちらの記事](/categories/makeWeb/5/)でも書いていますが、`.env`を使えばデプロイし直さなくても問題なさそうです。

## まとめ

Vercel の環境変数を追加した場合はデプロイし直しが必要、ということは認識していたのですが、  
ローカルで`.env.local` にいれて確認中という場合は`.env.local` にあれば良いと思っていました。

デプロイし直すか、`.env`を使うことで解決しました！

`.env` の話は[こちらの記事](/categories/makeWeb/5/)でも書いているので、もしよければご覧ください！
{.text-block .text-block--info}

## 参考

-   [https://github.com/firebase/firebase-tools/issues/2764](https://github.com/firebase/firebase-tools/issues/2764%E3%80%81https://github.com/firebase/firebase-tools/issues/5821){target=blank .external-link}
-   [https://github.com/firebase/firebase-tools/issues/5821](https://github.com/firebase/firebase-tools/issues/2764%E3%80%81https://github.com/firebase/firebase-tools/issues/5821){target=blank .external-link}
-   [vercel dev の際にローカルで環境変数を指定したい！](/categories/makeWeb/5/){target=blank .external-link}

