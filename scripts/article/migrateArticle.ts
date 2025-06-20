/* eslint-disable no-console */

import { ArticleRawMeta, ArticleRawMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { array, date, object, optional, safeParse, string } from "valibot";

const articleDirectoryPath = path.join("_contents", "articles");
const OldMetaSchema = object({
  id: optional(string()),
  title: string(),
  description: string(),
  headerImg: optional(string()),
  date: date(),
  lastEditDate: optional(date()),
  eleventyNavigation:
    object({
      key: string(),
      parent: string(),
    }),
  eleventyComputed: optional(
    object({
      tags: array(string()),
    }),
  ),

});

console.log("Migrating article...");
migrate();
console.log("end migrating article.");

function migrate() {
  fs.readdirSync(articleDirectoryPath, "utf-8")
    .filter(file => file.endsWith(".md"))
    .forEach((file) => {
      console.log(`Processing ${file}...`);
      const filePath = path.join(articleDirectoryPath, file); ;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      if (safeParse(ArticleRawMetaSchema, data).success) {
        // すでに新しい形式のメタデータが存在する場合はスキップ
        console.log(`Skipping ${file}: already migrated.`);
        return;
      }

      const oldMeta = safeParse(OldMetaSchema, data);
      if (!oldMeta.success) {
        console.error(`Failed to parse old meta for ${file}:`, oldMeta.issues);
        return;
      }

      console.log(`Migrating ${file}...`);

      const newMeta: ArticleRawMeta = {
        id: oldMeta.output.id || path.basename(file, ".md"),
        title: oldMeta.output.title,
        description: oldMeta.output.description,
        publishDate: oldMeta.output.date,
        lastModDate: oldMeta.output.lastEditDate || oldMeta.output.date,
        draft: false,
        category: oldMeta.output.eleventyNavigation.parent,
      };

      if (oldMeta.output.eleventyComputed && oldMeta.output.eleventyComputed.tags) {
        newMeta.tags = oldMeta.output.eleventyComputed.tags;
      }

      if (oldMeta.output.headerImg) {
        newMeta.thumbnail = oldMeta.output.headerImg;
      }

      const updated = matter.stringify(content, newMeta);
      fs.writeFileSync(filePath, updated, "utf-8");
    });
}
