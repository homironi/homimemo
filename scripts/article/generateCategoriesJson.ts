import { categoriesMetaFilePath } from "@/lib/server/article";
import { CategoryMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { parse } from "valibot";

const sourceDirectoryName = path.join("_contents", "categories");

console.log("generating categories json...");

fs.mkdirSync(path.dirname(categoriesMetaFilePath), { recursive: true });

const data = fs.readdirSync(sourceDirectoryName, "utf-8")
  .filter(file => file.endsWith(".md"))
  .map((file) => {
    const filePath = path.join(sourceDirectoryName, file); ;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return parse(CategoryMetaSchema, data);
  });

fs.writeFileSync(categoriesMetaFilePath, JSON.stringify(data, null, 2), "utf-8");

console.log({ categories: JSON.parse(fs.readFileSync(categoriesMetaFilePath, "utf-8")) });
console.log("end generate categories json");
