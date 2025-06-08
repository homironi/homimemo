import fs from "fs";
import path from "path";
import { array, InferOutput, minLength, object, parse, pipe, string } from "valibot";

export const articlesDirectory = path.join("_contents", "articles");
export const idToPathMapFile = path.join(".temp", "article", "idToPathMap.json");

/**
 * 記事のIDとファイルパスのマップの要素のスキーマ
 */
const IdToPathMapElementSchema = object({
  /**
   * 記事のID
   */
  id: pipe(string(), minLength(1, "記事のIDが設定されていません")),

  /**
   * 記事のファイルパス
   */
  filePath: pipe(string(), minLength(1, "記事のファイルパスが設定されていません")),
});

/**
 * 記事のIDとファイルパスのマップの要素の型
 */
export type ArticleIdToPathMapElement = InferOutput<typeof IdToPathMapElementSchema>;

/**
 * 記事のIDとファイルパスのマップのスキーマ
 */
const IdToPathMapSchema = array(IdToPathMapElementSchema);

/**
 * 記事IDに対応するマークダウンのファイルパスを取得する
 * @param id 記事ID
 * @returns 記事IDに対応するマークダウンファイルのパス
 */
export function getFilePath(id: string): string {
  const filePath = getIdToPathMap().find(item => item.id === id)?.filePath;
  if (!filePath) {
    throw new Error(`記事のファイルパスが見つかりません: ${id}`);
  }

  return filePath;
}

/**
 * 記事IDと対応するマークダウンファイルのパスのMapデータを取得
 * @returns 記事IDと対応するマークダウンファイルのパスのMapデータ
 */
export function getIdToPathMap(): ArticleIdToPathMapElement[] {
  return parse(IdToPathMapSchema, JSON.parse(fs.readFileSync(idToPathMapFile, "utf-8")));
}
