import { tagsMetaFilePath } from "@/lib/server/article";
import { TagMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "valibot";

const sourceDirectoryName = path.join("_contents", "tags");

console.log("generating tags json...");

const data = fs.readdirSync(sourceDirectoryName, "utf-8")
  .filter(file => file.endsWith(".md"))
  .map((file) => {
    const filePath = path.join(sourceDirectoryName, file); ;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return parse(TagMetaSchema, data);
  });

console.log({ tags: data });

fs.mkdirSync(path.dirname(tagsMetaFilePath), { recursive: true });
fs.writeFileSync(tagsMetaFilePath, JSON.stringify(data, null, 2), "utf-8");

console.log("end generate tags json");
