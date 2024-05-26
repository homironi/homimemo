---
title: 【UE5】アプリの名前設定めも【Unreal Engine】
description: この記事では、Unreal Engine 5（UE5）でプロジェクト設定で変更される名前を確認しました。開発用とリリース用のビルドで表示内容に違いがあったので、スクリーンショットともに紹介しています！
headerImg: /images/header/categories/developGame/0.png
date: 2024-03-17
eleventyNavigation:
    key: 【UE5】アプリの名前設定めも【Unreal Engine】
    parent: ゲーム開発
tags:
    - article
    - developGame
---

ゲームをビルドした際の表示名などを変更する箇所を確認したかったので、  
実際にビルドして試してみました。

公式ドキュメントを読めば正しくそのとおりな説明がありますが、  
実際にタスクマネージャーなどを開きながら確認したかったのでやってみました。

## プロジェクト設定で名前を設定

エディタを開いて、プロジェクト設定を開きます。

今回の確認では以下の 3 箇所を設定してみました。

-   プロジェクト名
-   プロジェクトが表示されたタイトル
-   プロジェクトデバッグタイトル情報

それぞれの設定は以下の通りです。

![プロジェクト設定](/images/articleImages/categories/developGame/0/projectSetting.png)

### プロジェクト名

-   設定箇所：`プロジェクト設定 ＞ 説明 ＞ Unreal Editorについて ＞ プロジェクト名`
-   設定した値：`ProjectName`
-   記事内では「プロジェクト名」と呼びます

### プロジェクトタイトル

-   設定箇所：`プロジェクト設定 ＞ 説明 ＞ 表示 ＞ プロジェクトが表示されたタイトル`
-   設定した値：`ProjectViewTitle`
-   記事内では「プロジェクトタイトル」と呼びます

### デバッグタイトル情報

-   設定した箇所：`プロジェクト設定 ＞ 説明 ＞ 表示 ＞ プロジェクトデバッグタイトル情報`
-   設定した値：`ProjectDebugTitle`
-   記事内では「デバッグタイトル情報」と呼びます

## 結果

各部分のスクリーンショットを撮ってきました。
比較ビルドは shipping と develop です。

### ウィンドウタイトル

上が develop 、下が shipping です。

全画面モード（フルスクリーン）の時は見えませんが、フルスクリーンを F11 で解除することもできます。

フルスクリーンだけに対応予定でも設定しておくとよいでしょう。

![ウィンドウタイトルの比較](/images/articleImages/categories/developGame/0/windowTitle.png)

#### develop

`【プロジェクトタイトル】 【タイトルデバッグ情報】`

#### shipping

`【プロジェクトタイトル】`

### タスクマネージャー

上が develop 、下が shipping です。

![タスクマネージャーの比較](/images/articleImages/categories/developGame/0/taskManager.png)

#### develop

`【プロジェクト名】`  
→`【プロジェクトタイトル】 【デバッグタイトル情報】`

#### shipping

`【プロジェクト名】`  
→`【プロジェクトタイトル】`

### タスクバー右クリック

上が develop 、下が shipping です。

![タスクバー右クリックの比較](/images/articleImages/categories/developGame/0/taskBar_RClick.png)

#### develop

`UnrealGame`

#### shipping

`【プロジェクトタイトル】`

### タスクバーマウスオーバー

上が develop 、下が shipping です。

![タスクバーマウスオーバー時の比較](/images/articleImages/categories/developGame/0/taskBar_hover.png)

#### develop

`【プロジェクトタイトル】 【デバッグタイトル情報】`

#### shipping

`【プロジェクトタイトル】`

## 参考

-   [プロジェクト設定](https://docs.unrealengine.com/5.3/en-US/project-section-of-the-unreal-engine-project-settings/){target=blank .external-link}
