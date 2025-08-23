import { TagMeta, TagMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "valibot";

/**
 * タグの情報ファイルのパス
 */
const tagsMetaFilePath = path.join("public", "generated", "meta", "tags.json");

const sourceDirectoryName = path.join("_contents", "tags");

console.log("generating tags json...");
generateTagsJson();
console.log("end generate tags json");

function generateTagsJson() {
  fs.mkdirSync(path.dirname(tagsMetaFilePath), { recursive: true });
  const data = generateTags();
  console.log({ tags: data });
  fs.writeFileSync(tagsMetaFilePath, JSON.stringify(data, null, 2), "utf-8");
}

function generateTags(): TagMeta[] {
  return fs
    .readdirSync(sourceDirectoryName, "utf-8")
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(sourceDirectoryName, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return parse(TagMetaSchema, data);
    });
}
