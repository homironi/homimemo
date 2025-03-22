---
title: ひよっこはFirebase Authenticationの単体テストを書きたい！
description: React+TypeScriptのひよっこ初学者がFirebaseAuthenticationのテストで躓いたエラーを紹介します。
headerImg: /images/header/categories/makeWeb/4.webp
date: 2025-02-07
eleventyNavigation:
    key: ひよっこはFirebase Authenticationの単体テストを書きたい！
    parent: Web制作
eleventyComputed:
    tags:
        - React
        - TypeScript
        - test
---

## はじめに

この記事では、Web アプリ開発ひよっこ初学者が Firebase Authentication の単体テストを書きます。

### 立場

-   ひよっこ初学者
-   制作物は 2 個目を作成中
-   1 個目の制作物は「[React+TypeScript でお天気 API から情報を取得してみた！](/categories/makeWeb/4/){target=blank .external-link}」でやってみた記事を書いています
-   Firebase Authentication はじめまして状態

## 構成

-   React+Next.js+TypeScript
-   Vercel でホスティング
-   Jest、testing-library
-   Firebase Authentication

## 何で困ったか？

2 個目の制作物となり、テストの書き方も慣れてきた今日この頃。

Firebase Authentication のメソッド呼び出しを含むメソッドのテストを書いていました。

テスト自体はメソッドをモックして、順調に進んでいるように思っていました。

以下のエラーに悩まされました。

```txt
@firebase/auth: Auth (11.2.0): INTERNAL ASSERTION FAILED: Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill

      3 |
      4 | export const signUpWithEmail = async (email: string, password: string) => {
    > 5 |   const userCredential = await createUserWithEmailAndPassword(
        |                          ^
      6 |     auth,
      7 |     email,
      8 |     password,
```

Firebase Authentication のメソッドである`createUserWithEmailAndPassword`メソッドのモックなども追加していたものの、Assertion が投げられています。

今回はこれを解決しました。

## 先に結論

`fetch`のモックをすれば解決です。

`whatwg-fetch`というパッケージをインストールし、以下の import を jest.setup.ts に追加することで解決できました。

```ts
import "whatwg-fetch";
```

詳細は次で説明します。

## 詳細

### 原因

Firebase Authentication の何かが問題なのかと思ったのですが、違いました。

fetch のモックが必要です。

今回テストの対象に含まれていた Firebase Authentication のメソッドでは fetch が必要でした。

テスト以外の通常動作の場合は fetch を意識する必要がありませんでしたが、テストになると fetch をモックする必要があったのです。

### 解決方法の詳細

▼ [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch){target=blank .external-link}をインストールします。

```command-line
npm install whatwg-fetch --save
```

▼ 今回は既に設定済みでしたが、jest のテストですべてのテストファイルでセットアップをするためのファイル設定をします。

```ts
setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
```

▼ `jest.setup.ts`に以下の import を追加し、すべてのテストで import されるように設定します。

```ts
import "whatwg-fetch";
```

これで fetch がモックされるようになり、解決しました！  
FirebaseAuthentication 特有の問題ではなく、fetch をモックする必要があった、という単純な問題でした！

以下のコード自体は解決方法とは関係ありませんが、参考までにどんなテストを書いていたのかも載せておきます！
{.text-block--info .text-block}

```ts
import { signUpWithEmail } from "@/lib/authentication";
import { auth } from "@/configs/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

jest.mock("firebase/auth", () => ({
    createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("@/configs/firebaseConfig", () => ({
    auth: {},
}));

describe("signUpWithEmail", () => {
    const mockEmail = "test@example.com";
    const mockPassword = "password123";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should call createUserWithEmailAndPassword with correct arguments", async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
            user: { uid: "mocked-uid" },
        });

        await signUpWithEmail(mockEmail, mockPassword);

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            auth,
            mockEmail,
            mockPassword
        );
    });
});
```

## さいごに

以下のエラー分で検索しても解決方法が出てこず、なかなか困りました。

```txt
@firebase/auth: Auth (11.2.0): INTERNAL ASSERTION FAILED: Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill
```

結果的に fetch のモックをすればよかっただけ、という単純なことが原因でした。  
そもそも fetch もモックが必要、ということをわかっていない状態だったのでかなり困ってしまいました。

Firebase Authentication を使う人は既に fetch のモックを導入済みだったり、わかっている人が多かったりするのかもしれません。  
fetch が createUserWithEmailAndPassword 内で呼ばれてるらしい、というところには気づくことができたものの、fetch のモックが必要ということにすぐに気付けませんでした。

いつか同じような人がいる時に備えて、この記事を書きました！  
ひよっこ、楽しみながらどんどこやりますよ～！

## 参考

-   [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch){target=blank .external-link}

