import fs from "fs";
import matter from "gray-matter";
import path from "path";

export const articleDirectoryName = path.join("_contents", "articles");
export const categoriesDirectoryName = path.join("_contents", "categories");

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
