import { Article } from "@/components/Article";
import { createIdToPathMap, getFilePath, saveIdToPathMap } from "@/lib/article";
import { ArticleMetaSchema } from "@/schemas/articleMeta";
import fs from "fs";
import matter from "gray-matter";
import type { Metadata } from "next";
import { parse } from "valibot";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  const idToPathMap = createIdToPathMap();
  saveIdToPathMap(idToPathMap);
  return idToPathMap.map(({ id }) => ({ id }));
}

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @param props 引数オブジェクト
 * @returns Meta情報
 */
export async function generateMetadata(
  props: Props,
): Promise<Metadata> {
  const { id } = await props.params;
  const raw = fs.readFileSync(getFilePath(id), "utf-8");
  const { data } = matter(raw);
  const validatedMeta = parse(ArticleMetaSchema, data);

  return {
    title: validatedMeta.title,
    description: validatedMeta.description,
  };
}

/**
 * 記事ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params 記事のIDを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const filePath = getFilePath(id);

  return (
    <Article filePath={ filePath } />
  );
}
