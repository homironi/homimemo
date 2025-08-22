import { Article } from "@/components/server/Article";
import { readStaticArticleContent } from "@/lib/server/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { Metadata } from "next";
import path from "path";

const filePath = path.join("_contents", "static-articles", "disclaimer.md");
function getSlug() {
  return `/${path.basename(__dirname)}/`;
}

/**
 * 免責事項ページのメタデータを生成する関数
 * @returns 免責事項ページのメタデータ
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
 * 免責事項ページのコンポーネント
 * @returns 免責事項の内容を表示するページ
 */
export default function DisclaimerPage() {
  const { meta, content } = readStaticArticleContent(filePath);
  return <Article meta={meta} content={content} shareSlug={getSlug()} />;
}
