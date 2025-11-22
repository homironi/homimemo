import { getIdToPathMap, idToPathMapPath } from "@/lib/_buildtime/article";
import { ArticleIdToPathMapElement } from "@/schemas/article/idToPathMap";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { articleDirectoryName } from "../lib/article";

console.log("generating article id to path json...");

const data = fs.readdirSync(articleDirectoryName, "utf-8")
  .filter(file => file.endsWith(".md"))
  .map((file) => {
    const filePath = path.join(articleDirectoryName, file); ;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    if(data.id === undefined || typeof data.id !== "string" || data.id.trim() === ""){
      throw new Error(`記事IDがありません: ${file}`);
    }

    return { file, id: data.id };
  })
  .map<ArticleIdToPathMapElement>(({ file, id }) => {
    return {
      id,
      filePath: path.join(articleDirectoryName, file),
    };
  });

fs.mkdirSync(path.dirname(idToPathMapPath), { recursive: true });
fs.writeFileSync(idToPathMapPath, JSON.stringify(data, null, 2), "utf-8");

console.log({ articleIdToPathMap: (getIdToPathMap()) });

console.log("end generate article id to path json");
