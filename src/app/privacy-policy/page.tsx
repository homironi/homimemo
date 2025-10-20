import { Article } from "@/components/_buildtime/Article";
import { readStaticArticleContent } from "@/lib/_buildtime/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { Metadata } from "next";
import path from "path";

const filePath = path.join("_contents", "static-articles", "privacy-policy.md");
function getSlug() {
  return `/${path.basename(__dirname)}/`;
}

/**
 * プライバシーポリシーページのメタデータを生成する関数
 * @returns プライバシーポリシーページのメタデータ
 */
export async function generateMetadata(): Promise<Metadata> {
  const { meta } = readStaticArticleContent(filePath);

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      ...createDefaultOG(
        meta.title,
        meta.description,
        getSlug(),
        meta.thumbnail
      ),
      type: "website",
    },
    twitter: createDefaultTwitter(meta.title, meta.description),
  };
}

/**
 * プライバシーポリシーページのコンポーネント
 * @returns プライバシーポリシーの内容を表示するページ
 */
export default function PrivacyPolicyPage() {
  const { meta, content } = readStaticArticleContent(filePath);
  return <Article meta={ meta } content={ content } shareSlug={ getSlug() } />;
}
