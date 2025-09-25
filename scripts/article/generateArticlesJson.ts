import { articlesMetaFilePath, convertMetaFromRaw } from "@/lib/server/article";
import { ArticleMeta, ArticleRawMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "valibot";
import { articleDirectoryName } from "../lib/article";

console.log("generating articles json...");

fs.mkdirSync(path.dirname(articlesMetaFilePath), { recursive: true });
const data = fs.readdirSync(articleDirectoryName, "utf-8")
  .filter(file => file.endsWith(".md"))
  .map((file) => {
    const filePath = path.join(articleDirectoryName, file); ;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return convertMetaFromRaw(parse(ArticleRawMetaSchema, data));
  })
  .filter((meta): meta is ArticleMeta => {
    return meta.id !== undefined && !meta.draft;
  });

console.log({ articles: data });
fs.writeFileSync(articlesMetaFilePath, JSON.stringify(data, null, 2), "utf-8");

console.log("end generate articles json");
