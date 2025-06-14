/* eslint-disable no-console */
// tsx で使用するスクリプトなのでログ出力のために警告を無効化する

import { getIdToPathMap, idToPathMapPath } from "@/lib/server/article";
import { ArticleIdToPathMapElement } from "@/schemas/article/idToPathMap";
import { ArticleRawMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { safeParse } from "valibot";

const articlesDirectory = path.join("_contents", "articles");

console.log("generating article id to path json...");

generateIdToPathMap();
console.log(getIdToPathMap());

console.log("end generate article id to path json");

/**
 * 記事IDとそれに対応するマークダウンファイルのパスのMapを生成して保存する
 */
export function generateIdToPathMap() {
  saveIdToPathMap(createIdToPathMap());
}

/**
 * 記事のIDとファイルパスのマップ
 * @returns 記事IDとファイルパスのマップの配列
 */
function createIdToPathMap(): ArticleIdToPathMapElement[] {
  return fs.readdirSync(articlesDirectory, "utf-8")
    .filter(file => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(articlesDirectory, file); ;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      const safeParsed = safeParse(ArticleRawMetaSchema, data);
      return { file, safeParsed };
    })
    .filter(({ safeParsed }) => safeParsed.success) // TODO: draft も除外するようにする
    .map<ArticleIdToPathMapElement>(({ file, safeParsed }) => {
      // すでに filter で成功したものだけを対象にしているので、パースに失敗することはありませんが
      // success をチェックしないと型補完が効かないので明示的にチェック
      if (!safeParsed.success) {
        throw new Error(`記事のメタデータのパースに失敗しました: ${file}`);
      }

      return {
        id: safeParsed.output.id,
        filePath: path.join(articlesDirectory, file),
      };
    });
};

/**
 * 受け取ったデータを保存する
 * @param idToPathMap 記事IDにとそのファイルパスのデータMap
 * @description 後でページで記事ID→ファイルパスを参照するためのマップを保存
 */
function saveIdToPathMap(idToPathMap: ArticleIdToPathMapElement[]) {
  fs.mkdirSync(path.dirname(idToPathMapPath), { recursive: true });
  fs.writeFileSync(idToPathMapPath, JSON.stringify(idToPathMap, null, 2), "utf-8");
}
