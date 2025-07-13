import { Article } from "@/components/server/Article";
import { readStaticArticleContent } from "@/lib/server/article";
import { Metadata } from "next";
import path from "path";

const filePath = path.join("_contents", "static-articles", "about.md");

/**
 * サイトについてのページのメタデータを生成する関数
 * @returns サイトについてのページのメタデータ
 */
export async function generateMetadata(): Promise<Metadata> {
  const { meta } = readStaticArticleContent(filePath);

  return {
    title: meta.title,
    description: meta.description,
  };
}
/**
 * サイトについてのページコンポーネント
 * @returns サイトについての情報を表示するページ
 */
export default function AboutPage() {
  const { meta, content } = readStaticArticleContent(filePath);
  return (
    <Article meta={ meta } content={ content } />
  );
}
