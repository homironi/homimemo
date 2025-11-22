import { formatDate } from "@/lib/date";
import { TagMeta } from "@/schemas/article/meta";
import { checkbox, confirm, input } from "@inquirer/prompts";
import tagsJson from "@public/generated/meta/tags.json";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { articleDirectoryName, getUseIdSet } from "../lib/article";
import { generateArticleId } from "../lib/articleId";

run();

async function run(){
  const tagData = tagsJson.map(raw => raw as TagMeta);

  try{
    const draft = await confirm({message: "記事を下書きにしますか？", default: false});
    const title = await input({message: "記事タイトルを入力してください：", default: "新規記事タイトル", required: true});
    const tags = await checkbox({
      message: "記事タグを選択してください（1つ以上必要です）：",
      required: true,
      choices: tagData.map(tag => {
        return {
          value: tag.name,
          description: tag.description,
        };
      }),
    });

    const id = generateArticleId(getUseIdSet());
    const date = new Date();

    const meta = {
      id,
      draft,
      title,
      tags,
      description: "ここにdescription",
      publishDate: date,
      lastModDate: date,
      thumbnail: `/images/header/articles/${id}.webp`
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
