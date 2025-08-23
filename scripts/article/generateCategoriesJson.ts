/* eslint-disable no-console */

import { CategoryMeta, CategoryMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "valibot";

/**
 * カテゴリの情報ファイルのパス
 */
const categoriesMetaFilePath = path.join(
  "public",
  "generated",
  "meta",
  "categories.json"
);

const sourceDirectoryName = path.join("_contents", "categories");

console.log("generating categories json...");
generateCategoriesJson();
console.log("end generate categories json");

function generateCategoriesJson() {
  fs.mkdirSync(path.dirname(categoriesMetaFilePath), { recursive: true });
  const data = createCategories();
  console.log({ categories: data });
  fs.writeFileSync(
    categoriesMetaFilePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

function createCategories(): CategoryMeta[] {
  return fs
    .readdirSync(sourceDirectoryName, "utf-8")
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(sourceDirectoryName, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return parse(CategoryMetaSchema, data);
    });
}
