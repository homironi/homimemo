import { formatDate } from "@/lib/date";
import { ArticleRawMeta, CategoryMeta } from "@/schemas/article/meta";
import { confirm, input, select } from "@inquirer/prompts";
import categoriesJson from "@public/generated/meta/categories.json";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { articleDirectoryName, generateCategoriesJson, getUseIdSet } from "../lib/article";
import { generateArticleId } from "../lib/articleId";

run();

async function run(){
  generateCategoriesJson();
  const categories = categoriesJson.map(raw => raw as CategoryMeta);

  try{
    const draft = await confirm({message: "記事を下書きにしますか？", default: false});
    const title = await input({message: "記事タイトルを入力してください：", default: "新規記事タイトル", required: true});
    const category = await select({
      message: "記事カテゴリを選択してください：",
      choices: categories.map(category => {
        return {
          value: category.name,
          description: category.description,
        };
      }),
    });

    const date = new Date();

    const meta :ArticleRawMeta = {
      id: generateArticleId(getUseIdSet()),
      draft,
      title,
      category,
      description: "ここにdescription",
      publishDate: date,
      lastModDate: date,
    };
    
    const fileName = `${formatDate(date, "YYYYMMDDHHmmss")}.md`;
    const newData = matter.stringify("ここに本文", meta);
    const filePath =path.join(articleDirectoryName, fileName);
    fs.writeFileSync(filePath, newData);

    console.log(`${filePath}に作成しました`);
  }catch{
    console.log("記事作成を中断しました");
  }
}
