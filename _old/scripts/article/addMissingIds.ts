import fs from "fs";
import matter from "gray-matter";
import { getAllArticleFilePaths, getUseIdSet } from "../lib/article";
import { generateArticleId } from "../lib/articleId";

console.log("🚀 記事IDの付与を開始");

let count = 0;
const useIds = getUseIdSet();
for (const filePath of getAllArticleFilePaths()) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);

  if (!parsed.data.id || typeof parsed.data.id !== "string" || parsed.data.id.trim() === "") {
    const newId = generateArticleId(useIds);
    const updated = matter.stringify(parsed.content, {
      id: newId,
      ...parsed.data,
    });
    fs.writeFileSync(filePath, updated);
    console.log(`- ✅  ${filePath} ： ${newId}`);
    ++count;
  }
}

if (count !== 0) {
  console.log("---");
  console.log(`📛 記事IDの付与終了：${count} 件`);
}
else {
  console.log("🎉 すべての記事にIDが付与されています。");
}
