import { categoriesMetaFilePath } from "@/lib/server/article";
import fs from "fs";
import { generateCategoriesJson } from "../lib/article";

console.log("generating categories json...");

generateCategoriesJson();

console.log({ categories: JSON.parse(fs.readFileSync(categoriesMetaFilePath, "utf-8")) });
console.log("end generate categories json");
