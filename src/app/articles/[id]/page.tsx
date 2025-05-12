import fs from "fs";
import matter from "gray-matter";
import { customAlphabet } from "nanoid";
import path from "path";

const articleDirectoryName = "_contents/articles";
const articleIdCharacters = "0123456789abcdefghijklmnopqrstuvwxyz";
const articleIdLength = 24;

export async function generateStaticParams() {
  return [
    { id: "20250429021614" }];
}

export default function ArticlePage() {
  const raw = fs.readFileSync("_contents/articles/20250429021614.md", "utf-8");
  const { data, content } = matter(raw);

  // TODO：このIDを補ったデータをValibotで型検証する
  const frontMatter = { id: data.id ? data.id : generateArticleId(), ...data };
  fs.writeFileSync("_contents/articles/20250429021614.md", matter.stringify(content, frontMatter));
  return (
    <div>
      <h2>frontMatter</h2>
      <p>
        { JSON.stringify(frontMatter) }
      </p>
      <h2>content</h2>
      <p>
        { content}
      </p>
    </div>
  );
}

/**
 * ユニークな記事IDの生成
 * @returns ユニークな記事ID
 * @todo ファイル分ける
 */
function generateArticleId(): string {
  // TODO:後々記事のmetaをjsonなどにまとめたら、そっちを参照して未使用IDを取得するように変更してもよいかも
  const usedIds = fs
    .readdirSync(articleDirectoryName)
    .filter(file => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(articleDirectoryName, file), "utf-8");
      const { data } = matter(raw);
      return data.id;
    });

  let id: string = "";
  const nanoid = customAlphabet(articleIdCharacters, articleIdLength);
  do {
    id = nanoid();
  }
  while (usedIds.includes(id));

  return id;
}
