import { ArticleMetaSchema } from "@/schemas/articleMeta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { array, InferOutput, minLength, object, parse, pipe, safeParse, string } from "valibot";

const articlesDirectory = path.join("_contents", "articles");
const idToPathMapFile = path.join(".temp", "article", "idToPathMap.json");

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
type IdToPathMapElement = InferOutput<typeof IdToPathMapElementSchema>;

/**
 * 記事のIDとファイルパスのマップのスキーマ
 */
const IdToPathMapSchema = array(IdToPathMapElementSchema);

/**
 * 記事のIDとファイルパスのマップ
 * @returns 記事IDとファイルパスのマップの配列
 */
export function createIdToPathMap(): IdToPathMapElement[] {
  return fs.readdirSync(articlesDirectory, "utf-8")
    .filter(file => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(articlesDirectory, file); ;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      const safeParsed = safeParse(ArticleMetaSchema, data);
      return { file, safeParsed };
    })
    .filter(({ safeParsed }) => safeParsed.success) // TODO: draft も除外するようにする
    .map<IdToPathMapElement>(({ file, safeParsed }) => {
      // すでに filter で成功したものだけを対象にしているので、パースに失敗することはありませんが
      // success をチェックしないと型補完をが効かないので明示的にチェック
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
export function saveIdToPathMap(idToPathMap: IdToPathMapElement[]) {
  fs.mkdirSync(path.dirname(idToPathMapFile), { recursive: true });
  fs.writeFileSync(idToPathMapFile, JSON.stringify(idToPathMap, null, 2), "utf-8");
}

/**
 * 記事IDに対応するマークダウンのファイルパスを取得する
 * @param id 記事ID
 * @returns 記事IDに対応するマークダウンファイルのパス
 */
export function getFilePath(id: string): string {
  const parsedIdToPathMap = parse(IdToPathMapSchema, JSON.parse(fs.readFileSync(idToPathMapFile, "utf-8")));
  const filePath = parsedIdToPathMap.find(item => item.id === id)?.filePath;
  if (!filePath) {
    throw new Error(`記事のファイルパスが見つかりません: ${id}`);
  }

  return filePath;
}
