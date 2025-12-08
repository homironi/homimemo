import {
  getAllArticlesMeta,
  getAllTags
} from "@/lib/_buildtime/article";
import {
  filterArticlesTag,
  getPageLength
} from "@/lib/article";
import type { Metadata } from "next";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";
import { generateTagArticlesPageMetadata, TagArticlesPage } from "../../_components/TagArticlesPage";

type Props = PageProps<"/tags/[tagSlug]/page/[number]">;

const dummy : Params = { tagSlug: "__dummy__", number: "1" };

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams() {
  const allArticles = getAllArticlesMeta();
  const all = getAllTags()
    .map((tag) => {
      // 1ページ目は「tags/[slug]/にするのでここでは生成しない」
      return getPageLength(filterArticlesTag(allArticles, tag).length).filter(i => i !== 1).map(
        (i) => ({
          tagSlug: tag.slug,
          number: i.toString(),
        })
      );
    })
    .flat();

  // 一件もページがない場合でも、空配列を返さない
  // 空配列になると、ビルド時に「missing "generateStaticParams()"」のエラーが出てしまうため
  if (all.length === 0) {
    // ダミーを1件返して、構造だけ維持
    return [dummy];
  }

  return all;
}

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns Meta情報
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number, tagSlug} = (await params);
  const page = parseInt(number);

  return generateTagArticlesPageMetadata(page, tagSlug);
}

/**
 * タグごとの記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function Page({ params }: Props) {
  const {number, tagSlug} = await params;
  if(tagSlug === dummy.tagSlug){
    notFound();
  }
  
  const page = parseInt(number);

  return (
    <TagArticlesPage page ={ page } tagSlug={ tagSlug } />
  );
}
