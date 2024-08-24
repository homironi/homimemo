#!/bin/bash

# スクリプトのディレクトリを取得
SCRIPT_DIR=$(dirname "$0")

# 必要な環境変数を設定
PROJECT_DIR="${SCRIPT_DIR}/../"
SOURCE_DIR="${PROJECT_DIR}/_public"
REMOTE_USER="homironi"
REMOTE_HOST="sv15001.xserver.jp"
REMOTE_DIR="/home/homironi/homironi.com/public_html"
REMOTE_PORT="10022"
SSH_KEY_PATH="$HOME/.ssh/xserver_homironi/homironi.key"

# SOURCE_DIR が存在するか確認
if [ -d "$SOURCE_DIR" ]; then
  # ディレクトリが存在する場合、中身を空にする
  echo "Clearing contents of $SOURCE_DIR..."
  rm -rf "${SOURCE_DIR:?}/"*
else
  # ディレクトリが存在しない場合、作成する
  echo "Creating source directory: $SOURCE_DIR"
  mkdir -p "$SOURCE_DIR"
fi

# サイトをビルドするためにプロジェクトディレクトリに移動
cd ../
echo "Move to projectDirectory: $SCRIPT_DIR/../"

# サイトのビルド
echo "Building site with Eleventy..."
npx @11ty/eleventy

# 元のディレクトリに戻る
cd tools

# SSH鍵の権限設定
chmod 600 "$SSH_KEY_PATH"

# rsyncコマンドの実行
rsync -auzrvv -e "ssh -i $SSH_KEY_PATH -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -p $REMOTE_PORT" --delete "$SOURCE_DIR/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

# デプロイ結果を表示
echo "Deployment complete."