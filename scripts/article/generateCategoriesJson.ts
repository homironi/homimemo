/* eslint-disable no-console */

import { CategoriesMeta, CategoryMetaSchema } from "@/schemas/article/category";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "valibot";

const sourceDirectoryName = path.join("_contents", "categories");
const outputPath = path.join("public", "meta", "categories.json");

console.log("generating categories json...");
generateCategoriesJson();
console.log("end generate categories json");

function generateCategoriesJson() {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const data = createCategories();
  console.log(data);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
}

function createCategories(): CategoriesMeta {
  return fs.readdirSync(sourceDirectoryName, "utf-8")
    .filter(file => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(sourceDirectoryName, file); ;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return parse(CategoryMetaSchema, data);
    });
}
