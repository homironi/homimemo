/**
 * カテゴリを廃止し、タグに統一するためのマイグレーションスクリプト
 */

import { getAllTags } from "@/lib/_buildtime/article";
import fs from "fs";
import matter from "gray-matter";
import { generateTagsJson, getAllArticleFilePaths } from "../lib/article";

console.log("Starting category to tag migration...");

// 最新のタグJSONを生成しておく
generateTagsJson();
const existTagNames = new Set<string>(getAllTags().map(tag => tag.name));

for (const filePath of getAllArticleFilePaths()) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);

  if (parsed.data.category && typeof parsed.data.category === "string" && existTagNames.has(parsed.data.category)) {
    const { category, ...removed } = parsed.data;
    const newTagArray = [category, ...(removed.tags ?? [])];
    const updated = matter.stringify(parsed.content, {
      ...removed,
      tags: newTagArray,
    });
    fs.writeFileSync(filePath, updated);
    console.log(`- ✅  ${filePath} ： ${newTagArray}`);
  }
}

console.log("Ended category to tag migration.");
