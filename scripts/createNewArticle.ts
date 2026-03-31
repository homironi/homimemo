import { formatDate } from "@/lib/date";
import { checkbox, confirm, input, select } from "@inquirer/prompts";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { articleDirectoryName, generateAllTagArray, getUseIdSet } from "./lib/article";
import { generateArticleId } from "./lib/articleId";
import { ARTICLE_TYPES, type ArticleMeta } from "./schemas/article";

run();

async function run(){
  const tagData = generateAllTagArray();

  try{
    const draft = await confirm({message: "記事を下書きにしますか？", default: false});
    const articleType = await select({
      message: "記事のタイプを選択してください：",
      choices: ARTICLE_TYPES.map((type) => ({
        value: type,
      })),
    });
    const title = await input({message: "記事タイトルを入力してください：", default: "新規記事タイトル", required: true});
    const tags = await checkbox({
      message: "記事タグを選択してください（1つ以上必要です）：",
      required: true,
      choices: tagData.map(tag => {
        return {
          value: tag.slug,
          name: tag.name,
          description: tag.description,
        };
      }),
    });

    const id = generateArticleId(getUseIdSet());
    const date = new Date();

    const meta : ArticleMeta = {
      id,
      draft,
      title,
      tags,
      description: "ここにdescription",
      publishDate: date,
      lastModDate: date,
      thumbnail: `/images/header/articles/${id}.webp`,
      articleType,
    };

    const fileName = `${formatDate(date, "YYYYMMDDHHmmss")}.mdx`;
    const newData = matter.stringify("ここに本文", meta);
    const filePath =path.join(articleDirectoryName, fileName);
    fs.writeFileSync(filePath, newData);

    console.log(`${filePath}に作成しました`);
  }catch(error){
    console.error(error);
    console.log("記事作成を中断しました");
  }
}
