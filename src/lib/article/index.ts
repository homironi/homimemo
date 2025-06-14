import { ArticleIdToPathMapElement, ArticleIdToPathMapElementSchema } from "@/schemas/article/idToPathMap";
import { ArticleMeta, ArticleRawMeta, CategoriesMetaSchema, CategoryMeta } from "@/schemas/article/meta";
import fs from "fs";
import path from "path";
import { array, parse } from "valibot";

/**
 * 記事IDとそれに対応するマークダウンファイルのパスデータのファイルパス
 */
export const idToPathMapPath = path.join(".temp", "article", "idToPathMap.json");

/**
 * カテゴリの情報ファイルのパス
 */
export const categoriesMetaFilePath = path.join("public", "generated", "meta", "categories.json");

/**
 * 記事のIDとファイルパスのマップのスキーマ
 */
const IdToPathMapSchema = array(ArticleIdToPathMapElementSchema);

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
  return parse(IdToPathMapSchema, JSON.parse(fs.readFileSync(idToPathMapPath, "utf-8")));
}

/**
 * カテゴリ名でカテゴリ情報を取得する
 * @param name 情報を取得したいカテゴリ名
 * @returns カテゴリ情報
 */
export function getCategoryMeta(name: string): CategoryMeta {
  const categories = parse(CategoriesMetaSchema, JSON.parse(fs.readFileSync(categoriesMetaFilePath, "utf-8")));
  const find = categories.find(category => category.name == name);
  if (!find) {
    throw new Error(`存在しないカテゴリ名です：${name}`);
  }

  return find;
}

/**
 * 生の記事Metaを記事Metaに変換
 * @param raw 生Meta
 * @returns 記事Meta
 */
export function convertMetaFromRaw(raw: ArticleRawMeta): ArticleMeta {
  return {
    ...raw,
    category: getCategoryMeta(raw.category),
  };
}
