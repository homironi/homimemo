import {
  getAllTags
} from "@/lib/server/article";
import type { Metadata } from "next";
import { generateTagArticlesPageMetadata, TagArticlesPage } from "./_components/TagArticlesPage";

type Params = {
  tagSlug: string;
};

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  return getAllTags()
    .map((tag) => {
      return {
        tagSlug: tag.slug
      };
    });
}

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns Meta情報
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tagSlug } = await params;
  const page = 1;

  return generateTagArticlesPageMetadata(page,tagSlug);
}

/**
 * タグごとの記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const {tagSlug} = await params;
  const page = 1;

  return (
    <TagArticlesPage page={ page } tagSlug={ tagSlug } />
  );
}
