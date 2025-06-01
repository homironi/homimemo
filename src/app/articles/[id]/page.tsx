import { Article } from "@/components/Article";
import { ArticleMetaSchema } from "@/schemas/articleMeta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { array, InferOutput, minLength, object, parse, pipe, safeParse, string } from "valibot";

const articlesDirectory = path.join("_contents", "articles");
const idToPathMapFile = path.join(".temp", "article", "idToPathMap.json");

type Params = {
  id: string;
};

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
function createIdToPathMap(): IdToPathMapElement[] {
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
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  const idToPathMap = createIdToPathMap();

  // 後でページで記事ID→ファイルパスを参照するためのマップを生成
  fs.mkdirSync(path.dirname(idToPathMapFile), { recursive: true });
  fs.writeFileSync(idToPathMapFile, JSON.stringify(idToPathMap, null, 2), "utf-8");

  return idToPathMap.map(({ id }) => ({ id }));
}

/**
 * 記事ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params 記事のIDを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const parsedIdToPathMap = parse(IdToPathMapSchema, JSON.parse(fs.readFileSync(idToPathMapFile, "utf-8")));
  const filePath = parsedIdToPathMap.find(item => item.id === id)?.filePath;
  if (!filePath) {
    throw new Error(`記事のファイルパスが見つかりません: ${id}`);
  }

  return (
    <Article filePath={ filePath } />
  );
}
