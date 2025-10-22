import { tagsMetaFilePath } from "@/lib/_buildtime/article";
import { TagMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "valibot";

export const articleDirectoryName = path.join("_contents", "articles");
const tagsSourceDirectoryName = path.join("_contents", "tags");

/**
 * すべての記事のファイルパスを取得する
 * @returns すべての記事ファイルパス
 */
export function getAllArticleFilePaths(){
  return fs.readdirSync(articleDirectoryName, { withFileTypes: true })
    .filter(file => file.isFile() && file.name.endsWith(".md"))
    .map(file => path.join(articleDirectoryName, file.name));
}

/**
 * 使用済みの記事IDSetを取得する
 * @returns 使用済みの記事IDSet
 */
export function getUseIdSet(){
  return new Set(
    getAllArticleFilePaths()
      .map((path) => {
        const raw = fs.readFileSync(path, "utf-8");
        const { data } = matter(raw);
        return data.id;
      })
      .filter((id): id is string => typeof id === "string" && id.trim() !== ""),
  );
}

/**
 * タグのJSONファイルを生成する
 */
export function generateTagsJson() {
  const data = fs.readdirSync(tagsSourceDirectoryName, "utf-8")
    .filter(file => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(tagsSourceDirectoryName, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return parse(TagMetaSchema, data);
    });

  console.log({ tags: data });

  fs.mkdirSync(path.dirname(tagsMetaFilePath), { recursive: true });
  fs.writeFileSync(tagsMetaFilePath, JSON.stringify(data, null, 2), "utf-8");
}
