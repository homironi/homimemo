import type { Metadata } from "next";
import { ArticlesPage, generateArticlesPageMetadata } from "./_components/ArticlesPage";

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @returns Meta情報
 */
export async function generateMetadata(): Promise<Metadata> {
  return generateArticlesPageMetadata(1);
}

/**
 * 記事一覧ページのコンポーネント
 * @returns 記事ページのJSX要素
 */
export default async function Page() {
  return (
    <ArticlesPage page={ 1 } />
  );
}
