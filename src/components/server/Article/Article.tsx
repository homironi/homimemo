import { ArticleCategory } from "@/components/ArticleCategory";
import { ArticleCategoryList } from "@/components/ArticleCategoryList";
import { ArticleTag } from "@/components/ArticleTag";
import { ArticleTagList } from "@/components/ArticleTagList/ArticleTagList";
import { BreadcrumbElement, Breadcrumbs } from "@/components/BreadCrumbs";
import { Profile } from "@/components/Profile";
import { articlesListPagePath, articleThumbnailNativeSize, createCategoryListFirstPagePath, defaultArticleThumbnail } from "@/lib/article";
import { getAllCategories, getAllTags } from "@/lib/server/article";
import { rehypeCodeLangLabel, rehypeCodeToolContainer, rehypeCopyButton } from "@/lib/server/rehypePlugins/code";
import { rehypeGfmTaskList } from "@/lib/server/rehypePlugins/gfmTaskList";
import { ArticleMeta, StaticArticleMeta } from "@/schemas/article/meta";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import Image from "next/image";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import styles from "./Article.module.css";
import "./prism.css"; // 記事内で使用するコードハイライトのPrismのスタイルを適用するためにインポート

const DynamicToc = dynamic(() => import("@/components/TableOfContents").then(mod => mod.TableOfContents));
const DynamicCodeCopyHandler = dynamic(() => import("@/components/CopyCodeHandler").then(mod => mod.default));
const tocContentSourceIdName = "toc-source-content";

type ArticleComponentMeta = ArticleMeta | StaticArticleMeta;

export type ArticleProps = {
  meta: ArticleComponentMeta;
  content: string;
};

/**
 * 記事ページコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.meta 記事のMeta
 * @param root0.content 記事内容
 * @returns 記事ページのコンポーネント
 */
export function Article({ meta, content }: ArticleProps) {
  const breadcrumbs: BreadcrumbElement[] = createBreadcrumbs(meta);

  return (
    <div className={ styles.container }>
      <DynamicCodeCopyHandler />
      <div className={ styles["first-side"] }>
        <DynamicToc
          tocContentSourceIdName={ tocContentSourceIdName }
        />
      </div>
      <main className={ styles.article }>
        <Breadcrumbs breadcrumbs={ breadcrumbs } />
        <h1>{ meta.title }</h1>
        { isArticleMeta(meta) && <ArticleCategory meta={ meta.category } />}
        { isArticleMeta(meta) && (
          <ul>
            {meta.tags && meta.tags.map((meta) => {
              return (
                <li key={ meta.slug }>
                  <ArticleTag meta={ meta } />
                </li>
              );
            })}
          </ul>
        )}
        <Image
          src={ meta.thumbnail ?? defaultArticleThumbnail }
          alt={ meta.title }
          width={ articleThumbnailNativeSize.width }
          height={ articleThumbnailNativeSize.height }
        />
        <ArticleMdx
          content={ content }
          tocContentSourceIdName={ tocContentSourceIdName }
        />
      </main>
      <div className={ styles["last-side"] }>
        <Profile />
        <ArticleCategoryList categories={ getAllCategories() } />
        <ArticleTagList tags={ getAllTags() } />
      </div>
    </div>
  );
}

type ArticleMdxProps = {
  className?: string;
  content: string;
  tocContentSourceIdName: string;
};

/**
 * 記事ページコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.content 記事のMDXコンテンツ
 * @param root0.tocContentSourceIdName 目次のコンテンツソースとして扱う目印のID名
 * @param root0.className クラス名
 * @returns 記事ページのコンポーネント
 */
function ArticleMdx({
  className,
  content,
  tocContentSourceIdName,
}: ArticleMdxProps) {
  return (
    <article
      id={ tocContentSourceIdName }
      className={ className ?? "" }
    >
      <MDXRemote
        source={ content }
        options={ {
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
            ],
            rehypePlugins: [
              rehypeSlug,
              rehypeAutolinkHeadings,
              [rehypePrism],
              rehypeCodeToolContainer,
              rehypeCodeLangLabel, // rehypeCodeToolContainer でコンテナが追加されていればその中に言語ラベルが追加される
              rehypeCopyButton, // rehypeCodeToolContainer でコンテナが追加されていればその中にコピーボタンが追加される
              rehypeGfmTaskList,
            ],
          },
        } }
      />
    </article>
  );
}

/**
 * 記事のMeta情報からパンくずリストを作成する関数
 * @param meta 記事のMeta情報
 * @returns パンくずリストの要素の配列
 */
function createBreadcrumbs(meta: ArticleComponentMeta): BreadcrumbElement[] {
  if (isArticleMeta(meta)) {
    return [
      {
        name: "記事一覧",
        href: articlesListPagePath,
      },
      {
        name: `${meta.category.name}`,
        href: createCategoryListFirstPagePath(meta.category),
      },
      {
        name: meta.title,
        href: `/articles/${meta.id}`,
        isCurrent: true,
      },
    ];
  }
  else {
    return [
      {
        name: meta.title,
        href: `/${meta.slug}/`,
        isCurrent: true,
      },
    ];
  }
}

/**
 * 記事のMeta情報がArticleMeta型であるかどうかを判定する関数
 * @param meta 記事のMeta情報
 * @returns 記事のMeta情報がArticleMeta型であるかどうか
 */
function isArticleMeta(meta: ArticleComponentMeta): meta is ArticleMeta {
  return "category" in meta && "tags" in meta;
}
