import { articlesMetaFilePath } from "@/lib/_buildtime/article";
import { ArticleMeta, articleMetaSchemaBase } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { array, minLength, object, parse, pipe, string, transform } from "valibot";
import { articleDirectoryName, generateAllTagArray } from "../lib/article";

console.log("generating articles json...");

const allTags = generateAllTagArray();

const ArticleMetaFromRawSchema = object({
  ...articleMetaSchemaBase,
  tags: pipe(
    array(string()), 
    minLength(1), 
    transform(raw => raw.map((name) => {
      const tag = allTags.find(tag => tag.name === name);
      if (!tag) {
        throw new Error(`タグが見つかりません: ${name}`);
      }
      
      return tag;
    }))
  ),
});

fs.mkdirSync(path.dirname(articlesMetaFilePath), { recursive: true });
const data = fs.readdirSync(articleDirectoryName, "utf-8")
  .filter(file => file.endsWith(".md"))
  .map((file) => {
    const filePath = path.join(articleDirectoryName, file); ;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return parse(ArticleMetaFromRawSchema, data);
  })
  .filter((meta): meta is ArticleMeta => {
    return meta.id !== undefined && !meta.draft;
  });

console.log({ articles: data });
fs.writeFileSync(articlesMetaFilePath, JSON.stringify(data, null, 2), "utf-8");

console.log("end generate articles json");
