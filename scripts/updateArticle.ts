import fs from "fs";
import matter from "gray-matter";
import { getArticleFilePath } from "./lib/article";
import { articleSchema, type ArticleMeta } from "./schemas/article";

run();

async function run(){
  try{
    const args = process.argv.slice(2);
    const idIndex = args.indexOf("--id");
    const id = idIndex !== -1 ? args[idIndex + 1] : null;
    if (!id) {
      console.error("--id が指定されていません。例: --id your_article_id");
      process.exit(1);
    }

    const articleFilePath = getArticleFilePath(id);
    const raw = fs.readFileSync(articleFilePath, "utf-8");
    const matterResult = matter(raw);
    const meta = articleSchema.parse(matterResult.data);

    const date = new Date();

    const newMeta: ArticleMeta = {
      ...meta,
      lastModDate: date,
    };

    const newData = matter.stringify(matterResult.content, newMeta);
    fs.writeFileSync(articleFilePath, newData);

    console.log(`${id}（${articleFilePath} ）を更新しました`);
  }catch(error){
    console.error(error);
    console.log("記事更新を中断しました");
  }
}
