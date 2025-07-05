import { Article } from "@/components/server/Article";
import { StaticArticleMeta, StaticArticleMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import { Metadata } from "next";
import path from "path";
import { parse } from "valibot";

const filePath = path.join("_contents", "static-articles", "privacy-policy.md");

/**
 * プライバシーポリシーページのメタデータを生成する関数
 * @returns プライバシーポリシーページのメタデータ
 */
export async function generateMetadata(): Promise<Metadata> {
  const { meta } = readArticleContent(filePath);

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
  const { meta, content } = readArticleContent(filePath);
  return (
    <Article meta={ meta } content={ content } />
  );
}

function readArticleContent(filePath: string): { meta: StaticArticleMeta; content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = parse(StaticArticleMetaSchema, data);
  return { meta, content };
}
