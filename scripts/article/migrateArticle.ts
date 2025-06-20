/* eslint-disable no-console */

import { getCategoryMeta, getTag } from "@/lib/server/article";
import { ArticleRawMetaSchema } from "@/schemas/article/meta";
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
  const allMeta = fs.readdirSync(articleDirectoryPath, "utf-8")
    .filter(file => file.endsWith(".md"))
    .map((file) => {
      // console.log(`Processing ${file}...`);
      const filePath = path.join(articleDirectoryPath, file); ;
      const raw = fs.readFileSync(filePath, "utf-8");
      return safeParse(ArticleRawMetaSchema, matter(raw).data);
    })
    .filter(result => result.success)
    .map(result => result.output);

  const categories = new Set(allMeta
    .map(meta => meta.category)
    .filter((category) => {
      try {
        getCategoryMeta(category);
      }
      catch {
        return true;
      }

      return false;
    }));
  console.log(`Found categories: ${Array.from(categories).join(", ")}`);

  const tags = new Set(allMeta
    .map(meta => meta.tags)
    .filter(tags => tags !== undefined && Array.isArray(tags))
    .flat()
    .filter((tag) => {
      try {
        getTag(tag);
      }
      catch {
        return true;
      }

      return false;
    }));
  console.log(`Found tags: ${Array.from(tags).join(", ")}`);
}
