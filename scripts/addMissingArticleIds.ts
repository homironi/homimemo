import fs from "fs";
import matter from "gray-matter";
import { customAlphabet } from "nanoid";
import path from "path";

const articleIdCharacters = "0123456789abcdefghijklmnopqrstuvwxyz";
const articleIdLength = 24;
const customNanoid = customAlphabet(articleIdCharacters, articleIdLength);

const articleDirectoryName = "_contents/articles";
const allArticlePaths = fs
  .readdirSync(articleDirectoryName, { withFileTypes: true })
  .filter(file => file.isFile() && file.name.endsWith(".md"))
  .map(file => path.join(articleDirectoryName, file.name));

// TODO:後々記事のmetaをjsonなどにまとめたら、そっちを参照して未使用IDを取得するように変更してもよいかも
const usedIds = new Set(
  allArticlePaths
    .map((path) => {
      const raw = fs.readFileSync(path, "utf-8");
      const { data } = matter(raw);
      return data.id;
    })
    .filter((id): id is string => typeof id === "string" && id.trim() !== ""),
);

console.log("🚀 記事IDの付与を開始");

let count = 0;
for (const filePath of allArticlePaths) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(raw);

  if (!parsed.data.id || typeof parsed.data.id !== "string" || parsed.data.id.trim() === "") {
    const newId = generateArticleId();
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

/**
 * ユニークな記事IDの生成
 * @returns ユニークな記事ID
 * @todo ファイル分ける
 */
function generateArticleId(): string {
  let id: string = "";
  do {
    id = customNanoid();
  }
  while (usedIds.has(id));

  usedIds.add(id);
  return id;
}
