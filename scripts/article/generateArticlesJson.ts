/* eslint-disable no-console */

import { convertMetaFromRaw } from "@/lib/article";
import { ArticleMeta, ArticleRawMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "valibot";

/**
 * 記事情報ファイルのパス
 */
const articlesMetaFilePath = path.join(
  "public",
  "generated",
  "meta",
  "articles.json"
);

const sourceDirectoryName = path.join("_contents", "articles");

console.log("generating articles json...");
generateArticlesJson();
console.log("end generate articles json");

function generateArticlesJson() {
  fs.mkdirSync(path.dirname(articlesMetaFilePath), { recursive: true });
  const data = createArticlesData();
  console.log({ articles: data });
  fs.writeFileSync(
    articlesMetaFilePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

function createArticlesData(): ArticleMeta[] {
  return fs
    .readdirSync(sourceDirectoryName, "utf-8")
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(sourceDirectoryName, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return convertMetaFromRaw(parse(ArticleRawMetaSchema, data));
    })
    .filter((meta): meta is ArticleMeta => {
      return meta.id !== undefined && !meta.draft;
    });
}
