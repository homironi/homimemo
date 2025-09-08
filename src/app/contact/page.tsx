import { Article } from "@/components/server/Article";
import { readStaticArticleContent } from "@/lib/server/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { Metadata } from "next";
import path from "path";

const filePath = path.join("_contents", "static-articles", "contact.md");
function getSlug() {
  return `/${path.basename(__dirname)}/`;
}

/**
 * お問い合わせページのメタデータを生成する関数
 * @returns お問い合わせページのメタデータ
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
 * お問い合わせページのコンポーネント
 * @returns お問い合わせ先を表示するページ
 */
export default function ContactPage() {
  const { meta, content } = readStaticArticleContent(filePath);
  return <Article meta={ meta } content={ content } shareSlug={ getSlug() } />;
}
