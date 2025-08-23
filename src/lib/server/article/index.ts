import {
  ArticleIdToPathMapElement,
  ArticleIdToPathMapElementSchema,
} from "@/schemas/article/idToPathMap";
import {
  StaticArticleMeta,
  StaticArticleMetaSchema,
} from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { array, parse } from "valibot";

/**
 * 記事IDとそれに対応するマークダウンファイルのパスデータのファイルパス
 */
export const idToPathMapPath = path.join(
  ".temp",
  "article",
  "idToPathMap.json"
);

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
  const filePath = getIdToPathMap().find((item) => item.id === id)?.filePath;
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
  return parse(
    IdToPathMapSchema,
    JSON.parse(fs.readFileSync(idToPathMapPath, "utf-8"))
  );
}

/**
 * 記事のマークダウンファイルを読み込み、Meta情報とコンテンツを取得する
 * @param filePath 記事のマークダウンファイルのパス
 * @returns 記事のMeta情報とコンテンツ
 */
export function readStaticArticleContent(filePath: string): {
  meta: StaticArticleMeta;
  content: string;
} {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = parse(StaticArticleMetaSchema, data);
  return { meta, content };
}
