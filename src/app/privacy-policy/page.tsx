import { Article } from "@/components/server/Article";
import { readStaticArticleContent } from "@/lib/server/article";
import { Metadata } from "next";
import path from "path";

const filePath = path.join("_contents", "static-articles", "privacy-policy.md");

/**
 * プライバシーポリシーページのメタデータを生成する関数
 * @returns プライバシーポリシーページのメタデータ
 */
export async function generateMetadata(): Promise<Metadata> {
  const { meta } = readStaticArticleContent(filePath);

  return {
    title: meta.title,
    description: meta.description,
  };
}

/**
 * プライバシーポリシーページのコンポーネント
 * @returns プライバシーポリシーの内容を表示するページ
 */
export default function PrivacyPolicyPage() {
  const { meta, content } = readStaticArticleContent(filePath);
  return (
    <Article meta={ meta } content={ content } />
  );
}
