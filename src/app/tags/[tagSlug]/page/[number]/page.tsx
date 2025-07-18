import { ArticleListPageLayout } from "@/components/ArticleListPageLayout";
import { BreadcrumbElement } from "@/components/BreadCrumbs";
import { createTagsPath, filterArticlesTag, getPageLength } from "@/lib/article";
import { getAllArticlesMeta, getAllTags, getTagMetaFromSlug } from "@/lib/server/article";
import { TagMeta } from "@/schemas/article/meta";
import type { Metadata } from "next";

type Params = {
  tagSlug: string;
  number: string;
};

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams(): Promise<Params[]> {
  const allArticles = getAllArticlesMeta();
  return getAllTags()
    .map((tag) => {
      return getPageLength(filterArticlesTag(allArticles, tag).length)
        .map(i => ({
          tagSlug: tag.slug,
          number: i.toString(),
        }));
    })
    .flat();
}

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns Meta情報
 */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const tagSlug = (await params).tagSlug;
  const meta = getTagMetaFromSlug(tagSlug);

  return {
    title: createTitle(meta),
    description: `${meta.name}の記事の一覧ページです。${meta.description}`,
  };
}

/**
 * タグごとの記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.params パスを含むパラメータ
 * @returns 記事ページのJSX要素
 */
export default async function TagsArticlesPage({ params }: { params: Promise<Params> }) {
  const rawParams = await params;
  const number = parseInt(rawParams.number);
  const tagMeta = getTagMetaFromSlug(rawParams.tagSlug);
  const articles = filterArticlesTag(getAllArticlesMeta(), tagMeta)
    .sort((a, b) => b.lastModDate.getTime() - a.lastModDate.getTime());
  const breadcrumbs: BreadcrumbElement[] = [
    {
      name: tagMeta.name,
      href: createTagsPath(tagMeta),
    },
  ];

  return (
    <ArticleListPageLayout
      breadcrumbs={ breadcrumbs }
      title={ createTitle(tagMeta) }
      articles={ articles }
      listPagePathBase={ createTagsPath(tagMeta) }
      currentPageNumber={ number }
    />
  );
}

function createTitle(tagMeta: TagMeta) {
  return `${tagMeta.name}の記事一覧`;
}
