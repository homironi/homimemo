import { ArticleListPageLayout } from "@/components/ArticleListPageLayout";
import { BreadcrumbElement } from "@/components/BreadCrumbs";
import {
  getAllArticlesMeta,
  getTagMetaFromSlug
} from "@/lib/_buildtime/article";
import {
  createTagListPagePath,
  createTagsPathBase,
  filterArticlesTag
} from "@/lib/article";
import {
  createDefaultOG,
  createDefaultTwitter,
  createTitleFromTemplate,
} from "@/lib/utils";
import { TagMeta } from "@/schemas/article/meta";
import type { Metadata } from "next";

/**
 * Next.jsのページで使用するTagArticlesPage用の静的Meta情報の生成
 * @param page ページ番号
 * @param tagSlug タグのSlug
 * @returns Meta情報
 */
export async function generateTagArticlesPageMetadata(page : number, tagSlug : string): Promise<Metadata> {
  const meta = getTagMetaFromSlug(tagSlug);
  const title = createTitle(meta);
  const description = `${meta.name}の記事の一覧ページです。${
    meta.description ?? ""
  }`;
  const slug = createTagListPagePath(meta, page);

  return {
    title,
    description,
    openGraph: createDefaultOG(title, description, slug),
    twitter: createDefaultTwitter(title, description),
  };
}

type TagArticlesPageProps = {
  page : number;
  tagSlug : string;
};

/**
 * タグごとの記事一覧ページのコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.page ページ番号
 * @param root0.tagSlug タグのSlug
 * @returns 記事ページのJSX要素
 */
export function TagArticlesPage({page, tagSlug} : TagArticlesPageProps) {
  const tagMeta = getTagMetaFromSlug(tagSlug);
  const articles = filterArticlesTag(getAllArticlesMeta(), tagMeta).sort(
    (a, b) => b.lastModDate.getTime() - a.lastModDate.getTime()
  );
  const breadcrumbs: BreadcrumbElement[] = [
    {
      name: tagMeta.name,
      href: createTagListPagePath(tagMeta),
    },
  ];

  return (
    <ArticleListPageLayout
      breadcrumbs={ breadcrumbs }
      title={ createTitle(tagMeta) }
      articles={ articles }
      listPagePathBase={ createTagsPathBase(tagMeta) }
      currentPageNumber={ page }
      firstPagePath={ createTagListPagePath(tagMeta,1) }
    />
  );
}

function createTitle(tagMeta: TagMeta) {
  return createTitleFromTemplate(`${tagMeta.name}の記事一覧`);
}
