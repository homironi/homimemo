import { Article } from "@/components/server/Article";
import { readStaticArticleContent } from "@/lib/server/article";
import { Metadata } from "next";
import path from "path";

const filePath = path.join("_contents", "static-articles", "disclaimer.md");

/**
 * 免責事項ページのメタデータを生成する関数
 * @returns 免責事項ページのメタデータ
 */
export async function generateMetadata(): Promise<Metadata> {
  const { meta } = readStaticArticleContent(filePath);

  return {
    title: meta.title,
    description: meta.description,
  };
}

/**
 * 免責事項ページのコンポーネント
 * @returns 免責事項の内容を表示するページ
 */
export default function DisclaimerPage() {
  const { meta, content } = readStaticArticleContent(filePath);
  return (
    <Article
      meta={meta}
      content={content}
      shareSlug={`/${path.basename(__dirname)}/`}
    />
  );
}
