---
title: ひよっこはnext/routerに枕を濡らす
description: Next.js初心者がuseRouterで困った話を残しています。すぐに解決しましたが、忘れないためにメモしています。
headerImg: /images/header/categories/makeWeb/7.webp
date: 2025-03-06
lastEditDate: 2025-03-22
eleventyNavigation:
    key: ひよっこはnext/routerに枕を濡らす
    parent: Web制作
eleventyComputed:
    tags:
        - Nextjs
---

## はじめに

今回は Next.js を始めた直後にぶつかった話です。

公式の解説ページにすぐに飛べたので、解決はすぐにしましたがちょっとわなですよね、というお話です。

## なにがどうした？

🐤「まずは試しにボタンを押したらページ遷移するようにするぞ！」

🐤「なるほど、[`useRouter()`](https://nextjs.org/docs/app/api-reference/functions/use-router){target=blank .external-link}ってやつで`push()`したらいいんだな！」

```ts
"use client";

import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();

    return (
        <button type="button" onClick={() => router.push("/")}>
            画面遷移
        </button>
    );
}
```

🐤「さあ、確認するぞ、ぽちー」

```txt
invariant expected app router to be mounted
```

🐤「……？？？」

おわかりいただけたでしょうか……。

公式の`useRouter`のサンプルコードを改めてみて見ましょう。

[useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router){target=blank .externak-link}

```ts
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <button type="button" onClick={() => router.push("/dashboard")}>
            Dashboard
        </button>
    );
}
```

概ね流れは同じだと思います。  
が、import をよく見てみてください。

`next/router`ではなく、`next/navigation`を使うのが正しかったのです……！！

エラー文で検索をかけるとすぐに Next.js 公式のページを見つけられました。

[`NextRouter` was not mounted](https://nextjs.org/docs/messages/next-router-not-mounted){target=blank .external-link}

## おわりに

`next/router`と`next/navigation`が候補にあったので、`next/router`を選んでしまったことによるエラーでした。

🐤「2 個出てきたな……。`next/router`と`next/navigation`……`useRouter`だし`next/router`かな？違ったら分かるし、ぽちー」

🐤「お！ エラー出ないしこっちであってたみたい！ やったー！」

という流れで完全に術中に陥りました。

VSCode の候補で`next/router`が並ぶと名前が近いのでそっちを選んじゃう、あるあるだと思います！

## 参考

-   [useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router){target=blank .external-link}
-   [`NextRouter` was not mounted](https://nextjs.org/docs/messages/next-router-not-mounted){target=blank .external-link}

