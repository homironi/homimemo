import { customAlphabet } from "nanoid";

const articleIdCharacters = "0123456789abcdefghijklmnopqrstuvwxyz";
const articleIdLength = 24;
const customNanoid = customAlphabet(articleIdCharacters, articleIdLength);

/**
 * ユニークな記事IDの生成
 * @param usedIds 使用済みのID
 * @returns ユニークな記事ID
 * @description 使用済みIDセットには生成したIDを追加するなどはしないので、必要であれば取得したIDをセットする
 */
export function generateArticleId(usedIds:Set<string>): string {
  let id: string = "";
  do {
    id = customNanoid();
  }
  while (usedIds.has(id));

  return id;
}
