---
title: GitHubActionsでビルドからアップロードまでしてみるめも
description: Eleventy（11ty）を利用し、GitHub Actionsを使ってWebサイトの自動ビルドからリモートサーバーへの自動デプロイ手順を解説。mainブランチへのプッシュでビルドし、Eleventyを使ったサイトファイルをエックスサーバーへアップロードするGitHubActionsの使い方を紹介します。
headerImg: /images/header/categories/developOther/0.png
date: 2023-12-19
eleventyNavigation:
    key: GitHubActionsでビルドからアップロードまでしてみるめも
    parent: 開発系その他
tags:
    - developOther
---

タイトル通りですが、本記事では以下の内容をメモしていきます。

Eleventy（11ty）を使用してウェブサイトをビルドし、ビルドされたファイルをサーバーにデプロイする。

1. 「main」ブランチにプッシュされたら
1. サイトをビルドして（11ty）
1. 出力されたサイトのファイル達をサーバー（エックスサーバー）にアップロード

以上を GitHubActions を使用して行ったので、そのメモです！

## 手順

### エックスサーバーで秘密鍵を取得

こちらは SSH 接続を行うために必要です。

秘密鍵の取得や登録は公式でわかりやすく説明されているので、以下をご確認ください。

パスワードが設定されていると、GitHubActions の途中で止まってしまうとのことなので、パスはなし（入力しない）

[公式の SSH 設定](https://www.xserver.ne.jp/manual/man_server_ssh.php){target=blank .externalLink}

こちらで取得した鍵の中身をあとで Github のシークレット変数に貼り付けます。

### GitHub リポジトリでのワークフロー設定

1. GitHub リポジトリにアクセス
1. リポジトリ内で、上部メニューの「Actions」をクリック  
   ![GitHubのActions](/images/articleImages/categories/developOther/0/GitHub_Actions.png)
1. ワークフローがまだ設定されていない場合は、「Set up a workflow yourself」を選択。  
   ![Set up a workflow yourself](/images/articleImages/categories/developOther/0/GitHub_Actions_setupWorkflow.png)  
   既存のワークフローがある場合は、「New workflow」ボタンをクリック  
   ![New workflow](/images/articleImages/categories/developOther/0/GitHub_Actions_newWorkflow.png)
1. エディタが開いたら、そこに後述する`deployMain.yaml`の内容を貼り付け
1. エディタでコードを貼り付けたら、「Commit changes...」をクリック  
   ![workFlowCode](/images/articleImages/categories/developOther/0/GitHub_workflowCode.png)
1. 適切なコミットメッセージを入力し、「Commit changes」をクリック  
   ![commit](/images/articleImages/categories/developOther/0/GitHub_Actions_commit.png)

これで、GitHub Actions に新しいワークフローが設定されました。

`main` ブランチに新しいコミットがプッシュされると、このワークフローが実行されるようになります。

ワークフローでは Eleventy でウェブサイトをビルドし、rsync を使用してリモートサーバーにデプロイします。

### GitHub リポジトリでのシークレット変数設定

1. GitHub リポジトリにアクセス
1. リポジトリ内で、上部メニューの「Settings」をクリック  
   ![Settings](/images/articleImages/categories/developOther/0/GitHub_repo.png)
1. 「secrets and variables」＞「Actions」を選択  
   ![secretsAndVariables](/images/articleImages/categories/developOther/0/GitHub_secret.png)
1. 「New repository secret」を選択  
   ![newVariable](/images/articleImages/categories/developOther/0/GitHub_secret_newVariable.png)
1. `Name`を`SSH_PRIVATE_KEY`と入力  
   後述するコードの変数名になります。任意の名前にしていただいても問題ありません。
1. `Secret`に生成した秘密鍵の中身をコピペします
1. 「Add secret」を選択してシークレット変数を追加  
   ![add secret](/images/articleImages/categories/developOther/0/GitHub_secret_add.png)

## GitHubActions のコード

ファイル名は任意です。

今回は`deployMain.yaml`にしました

### `deployMain.yaml`

```yaml
name: deploy to remote

on:
    push:
        branches:
            - main

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout code
              uses: actions/checkout@v4

            - name: Generate SSH key
              run: |
                  echo "$SSH_PRIVATE_KEY" > key
                  chmod 600 key
              env:
                  SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}

            - name: Install Eleventy
              run: npm install -g @11ty/eleventy

            - name: Build site with Eleventy
              run: npx @11ty/eleventy

            - name: Deploy via rsync
              run: |
                  rsync -auzrv --update -e "ssh -i key -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -p 10022" --delete ./_public/ hogeId@svhoge.xserver.jp:/home/hogege/hoge.com/public_html/
```

## エックスサーバーでサーバー情報を確認

ワークフローのコードでは、サーバーにデータを同期するために必要な情報がいくつかあります。

情報を確認し、コード上の`hoge`などを自身のサーバーの ID などに置き換えます

### 各情報の確認

1. エックスサーバーでサーバーパネルにログイン
2. **サーバー ID**が表示されていると思うので、それを確認  
   コードを書くときに`hogeId`と書かれている部分をここで確認できるサーバー ID に置き換え
   ![serverPane](/images/articleImages/categories/developOther/0/Xserver_panel.png)
3. 続いて「サーバー情報」をクリック
4. サーバー情報のページで、**ホスト名**と**ホームディレクトリ**を確認  
   それぞれコードの、`svhoge`→ ホスト名、`/home/hogegege`→ ホームディレクトリを置き換え
   ![serverInfo](/images/articleImages/categories/developOther/0/Xserver_serverInfo.png)

### 置き換え箇所まとめ

-   `hogeId`→ サーバー ID
-   `svhoge`→ ホスト名  
    今は`svほげほげ`の形式がほとんどのようですが、いつか変わるかもしれませんので、その点はご注意を。
-   `/home/hogegege`→ ホームディレクトリ  
    「`home`なんてフォルダはないから home は省略だな！」としばらくなやみました……。  
    そしてその次はホームディレクトリ`hogegege`を省いてしまっていて更に悩みました。  
    どちらも必要です……！

{.list .check}

## コードの各ステップ詳細

### ワークフロー名: `deploy to remote`

-   この名前はワークフロー自体を表します。
-   通常、何を行うかを簡潔に表すことが一般的です。
-   今回は（そのまんまですが）「リモートにデプロイ」するワークフローです。

### トリガー条件: `on: push: branches: - main`

-   このワークフローは、GitHub リポジトリで `main` ブランチにコミットがプッシュされたときに実行されます。
-   人によっては`master`ブランチかもしれませんね。

### ジョブ

-   `deploy` という名前のジョブが定義されています。
-   このジョブは `ubuntu-latest` 上で実行されます。

### ジョブの手順

1. **Checkout code**  
   GitHub リポジトリのコードをワークフローの実行環境にチェックアウト
1. **Generate SSH key**  
   デプロイ先のサーバーに SSH 接続するための鍵を生成します。  
   GitHub Actions のシークレット `SSH_PRIVATE_KEY` に設定された秘密鍵を使って `key` ファイルを作成し、権限を設定します。  
   GitHub 側の設定は後ほど。  
   上記の通り、ここでは GitHub で設定した値を使用して、`key`を作成します。
1. **Build site with Eleventy**  
   Eleventy を使用してウェブサイトをビルド。  
   Eleventy のコマンド `npx @11ty/eleventy` を実行し、ウェブサイトのビルドが行われます。  
   今回は、ビルドしたファイル達は`_public`というフォルダに出力されるように、11ty 側で設定を変更してあります。
1. **Deploy via rsync**  
   rsync コマンドを使用して、ビルドされたファイルをリモートサーバーにデプロイ  
   `_public` フォルダの中身を `hogeId@svhoge.xserver.jp` というユーザーのリモートサーバーの `/home/hogege/hoge.com/public_html/` に同期  
   SSH 鍵 `key` を使用し、ポート番号 `10022` で接続します。

以上のコードが実行されると、`main` ブランチにプッシュされた際に Eleventy を使用してサイトをビルドし、その後 rsync を介してビルドされたファイルを指定されたエックスサーバーにデプロイ、までを GitHubActions が行ってくれます。  
![result](/images/articleImages/categories/developOther/0/GitHub_Actions_result.png)

## あとがき

以上でメモは終了です。

上記を行えるようになったおかげで、サイト公開までのワークフローが変わりました。

### 旧ワークフロー

1. マークダウンで記事作成（作業ブランチにて）
2. `develop`ブランチにプルリクエスト → マージ
3. `main`ブランチに develop をマージ
4. main で 11ty のビルド
5. FileZilla（FTP ソフト）起動
6. FileZilla でサーバーにログイン
7. `_public`フォルダに出力されたファイルをサーバーにアップロード（この時点でサイトが公開される）
8. 「アップロードされているけど、不要になったデータ」があれば手動で削除

### 新ワークフロー

1. マークダウンで記事作成（作業ブランチにて）
2. `develop`ブランチにプルリクエスト → マージ
3. `main`ブランチに develop をマージ

あとは main のプッシュ（develop からのマージ）を検知した GitHubActions がなんやかんやしてくれます。

旧ワークフローの以降の手順はすべて自動で行ってくれるようになりました。

特に『「アップロードされているけど、不要になったデータ」があれば手動で削除』が面倒だったのとこわかったのもあり……。

`rsync`コマンドのオプションの`--delete`でファイルの削除も同期されるようになったので大満足です。

### `rsync`コマンドのオプション

`rsync`コマンドは他にもオプションがあるので、調べて取り入れてみてもよいかもしれません。

以下の例えば`-a, --archive`は`-a`でも`--archive`でも同じコマンドとして認識してくれます。

| オプション          | 説明                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `-u, --update`      | 送信元にある新しいファイルのみを転送します。すでに送信先に同じファイル名が存在していても、更新日時を確認し、新しい場合のみ上書きします。 |
| `-e, --rsh=COMMAND` | リモートシェルを指定。例えば、SSH でリモートサーバーに接続する際に使用します。                                                           |
| `--delete`          | 送信元には存在しないが、送信先にあるファイルを削除します。これにより、送信元から削除されたファイルも送信先からも削除されます。           |
| `-a, --archive`     | ファイルの属性や権限など、基本的な情報を保持しながらデータを転送します。                                                                 |
| `-v, --verbose`     | 詳細な出力を表示します。実行されるコマンドや転送されるファイルの情報を表示します。                                                       |
| `-r, --recursive`   | 再帰的にディレクトリを同期します。ディレクトリ内のファイルやサブディレクトリも含めて同期します。                                         |
| `-z, --compress`    | データの転送時に圧縮します。転送する際にデータを圧縮し、帯域幅を節約します。                                                             |
| `-n, --dry-run`     | 実際には実行せず、試行するモードです。実行されるコマンドや転送されるファイルを確認できますが、実際の転送は行いません。                   |

## 参考リンク

-   [エックスサーバー公式の SSH 設定ページ](https://www.xserver.ne.jp/manual/man_server_ssh.php){target=blank .externalLink}
-   [エックスサーバーにローカル →github→ サーバーへ自動デプロイしたメモ](https://zenn.dev/ytksato/articles/e71bdcb894062c){target=blank .externalLink}
-   [GitHub に Push するだけで、レンタルサーバーにサイト公開してみた](https://www.to-r.net/media/github-actions/){target=blank .externalLink}
