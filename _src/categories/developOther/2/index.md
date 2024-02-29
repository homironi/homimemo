---
title: Doxygen で XML ドキュメントコメントを使うめも
description: ドキュメント生成を手軽に行いたいけど、どうしたらいいかわからない？この記事では、Doxygenを使った簡単な方法や、Visual Studioでの便利なXMLドキュメントコメントの活用法を紹介しています。さらに、C#開発者には必見のドキュメント生成ツールであるDocFXについても紹介しています。XMLドキュメントの使い方やツールの選び方について知りたい方はぜひ読んでみてください！
headerImg: /images/header/categories/developOther/2.png
date: 2024-02-16
eleventyNavigation:
    key: Doxygen で XML ドキュメントコメントを使うめも
    parent: 開発系その他
tags:
    - developOther
---

-   Doxygen でお手軽にドキュメントを生成したい！
-   Visual Studio を使う場合、XML ドキュメントは  
    `///` スラッシュ 3 つで `summary` などが出てくるので便利！
-   Doxygen で XML ドキュメントコメントを使う場合の対応度合いなどをみてみよう！

{.check .list}

[XML ドキュメントコメント（Microsoft 公式）](https://learn.microsoft.com/ja-jp/dotnet/csharp/language-reference/xmldoc/){target=blank .externalLink}

## 結論

以下のリファレンスサイトで確認することができます。

-   [Doxygen の XML ドキュメントコメントに関係するコマンド対応状況](https://cercopes-z.com/Doxygen/list-xmldoc-dxy.html){target=blank .externalLink}
    → 文字通り XML ドキュメントコメントと関係しているコマンドの対応度合いを表にしてあるページです。
-   [XML ドキュメントコメントタグ対応表](https://cercopes-z.com/XMLDoc/index.html){target=blank .externalLink}
    こちらも上記と似ていますが、より詳細に Doxygen で対応されているかどうかが表にまとめられています。  
    こちらは Doxygen だけでなく、他のドキュメント生成ツールで対応されているかどうかも含めて表にまとめられています。  
    Doxygen で対応されているかどうかは、Doxygen の項目を確認してみましょう。

## Visual Studio と XML ドキュメントコメント

XML ドキュメントコメントは C# で主に使われていますが、  
Visual Studio を使用する場合は C++ などの C# 以外の言語を使っていても便利だと思っています。

### コメント入力の手軽さ

> Visual Studio のコード エディターで  `///`  区切り記号を入力すると、`<summary>`  および  `</summary>`  タグが自動的に挿入され、これらのタグ内にカーソルが配置されます。
> {.block}

引用元：[XML のコメントの書式](https://learn.microsoft.com/ja-jp/dotnet/csharp/language-reference/xmldoc/#xml-comment-formats){target=blank .externalLink}

引用した通り、変数名やメソッド名の上の行で`///` とスラッシュ 3 つを入力するだけで  
summary コメントが自動で挿入されます。

これは C++ を使っている際も同様で、非常に楽にコメントを入力できます。

メソッドの場合は、引数や戻り値などを先に定義しておけば、自動でその部分も挿入してくれます。

これが非常に便利なので、C++ でも XML ドキュメントコメントを使用しています。

### コメント忘れ防止

Visual Studio では、XML ドキュメントコメントを使用する際に、設定をするとドキュメントがない部分に警告を出してくれるようにできる設定があります。

この設定をしておくと、「コメントを後でつけようと思っていて忘れた！」ということを防ぐことができる可能性があがるでしょう。

> GenerateDocumentationFile  または  DocumentationFile  オプションのいずれかを設定すると、コンパイラでソース コード内の XML タグを含むすべてのコメント フィールドが検索され、それらのコメントから XML ドキュメント ファイルが作成されます。 このオプションが有効になっている場合、プロジェクトに宣言されていて公開される、XML ドキュメント コメントのないメンバーに対して、CS1591  警告がコンパイラで生成されます。
> {.block}

引用元：[XML ドキュメント出力の作成](https://learn.microsoft.com/ja-jp/dotnet/csharp/language-reference/xmldoc/#create-xml-documentation-output){target=blank .externalLink}

## C# の場合は DocFX

C# の場合は、DocFX というドキュメント生成ツールが用意されています。

C# を使用して開発を行う場合は、Doxygen よりも DocFX を使用するほうが良いでしょう。

主に C#で開発を行うことができる Unity の API リファレンスなども、おそらく DocFX で出力されているのではないかと思われます。

Unity のパッケージなどのドキュメントも DocFX と同じ形式になっているものが多いです。

-   [XML ドキュメント入力が受け入れられるツール（Microsoft 公式）](https://learn.microsoft.com/ja-jp/dotnet/csharp/language-reference/xmldoc/#tools-that-accept-xml-documentation-input){target=blank .externalLink}
-   [DocFX](https://dotnet.github.io/docfx/){target=blank .externalLink}

## 参考

-   [XML ドキュメントコメント（Microsoft 公式 ）](https://learn.microsoft.com/ja-jp/dotnet/csharp/language-reference/xmldoc/){target=blank .externalLink}
-   [Doxygen の XML ドキュメントコメントに関係するコマンド対応状況](https://cercopes-z.com/Doxygen/list-xmldoc-dxy.html){target=blank .externalLink}
-   [XML ドキュメントコメントタグ対応表](https://cercopes-z.com/XMLDoc/index.html){target=blank .externalLink}
