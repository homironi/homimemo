import { Article } from "@/components/_buildtime/Article";
import { readStaticArticleContent } from "@/lib/_buildtime/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import { Metadata } from "next";
import path from "path";

const filePath = path.join("_contents", "static-articles", "profile.md");
function getSlug() {
  return `/${path.basename(__dirname)}/`;
}

/**
 * プロフィールのページのメタデータを生成する関数
 * @returns プロフィールページのメタデータ
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
 * プロフィールページコンポーネント
 * @returns プロフィールページ
 */
export default function AboutPage() {
  const { meta, content } = readStaticArticleContent(filePath);
  return <Article meta={ meta } content={ content } shareSlug={ getSlug() } />;
}
