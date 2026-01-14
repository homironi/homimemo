import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { type TagMeta, tagSchema } from "../schemas/article";

export const articleDirectoryName = path.join("_contents", "articles");
const tagsSourceDirectoryName = path.join("_contents", "tags");

/**
 * すべての記事のファイルパスを取得する
 * @returns すべての記事ファイルパス
 */
export function getAllArticleFilePaths(){
  return fs.readdirSync(articleDirectoryName, { withFileTypes: true })
    .filter(file => file.isFile() && file.name.endsWith(".mdx"))
    .map(file => path.join(articleDirectoryName, file.name));
}

/**
 * 記事IDから記事のファイルパスを取得する
 * @param id 記事ID
 * @returns 記事のファイルパス
 */
export function getArticleFilePath(id: string) {
  const filePath = getAllArticleFilePaths().find(file => {
    const raw = fs.readFileSync(file, "utf-8");
    const { data } = matter(raw);
    return data.id === id;
  });

  if (!filePath) {
    throw new Error(`記事が見つかりません: ${id}`);
  }

  return filePath;
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
 * タグのデータを生成する
 * @returns タグのデータ配列
 */
export function generateAllTagArray() : TagMeta[] {
  return fs.readdirSync(tagsSourceDirectoryName, "utf-8")
    .filter(file => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(tagsSourceDirectoryName, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return tagSchema.parse({
        ...data,
        slug: file.replace(/\.md$/, ""),
      });
    });
}
