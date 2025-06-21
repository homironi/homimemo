import { ArticleCategory } from "@/components/ArticleCategory";
import { ArticleTag } from "@/components/ArticleTag";
import { BreadcrumbElement, Breadcrumbs } from "@/components/BreadCrumbs";
import { rehypeCodeLangLabel, rehypeCodeToolContainer, rehypeCopyButton } from "@/lib/server/rehypePlugins/code";
import { rehypeGfmTaskList } from "@/lib/server/rehypePlugins/gfmTaskList";
import { ArticleMeta } from "@/schemas/article/meta";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import styles from "./Article.module.css";
import "./prism.css"; // 記事内で使用するコードハイライトのPrismのスタイルを適用するためにインポート

const DynamicToc = dynamic(() => import("@/components/TableOfContents").then(mod => mod.TableOfContents));
const DynamicCodeCopyHandler = dynamic(() => import("@/components/CopyCodeHandler").then(mod => mod.default));
const tocContentSourceIdName = "toc-source-content";

export type ArticleProps = {
  meta: ArticleMeta;
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
  const articlesHrefBase = "/articles";
  const breadcrumbs: BreadcrumbElement[] = [
    {
      name: "記事一覧",
      href: `${articlesHrefBase}/`,
    },
    {
      name: `${meta.category.name}`,
      href: `/categories/${meta.category.slug}/`,
    },
    {
      name: meta.title,
      href: `${articlesHrefBase}/${meta.id}`,
      isCurrent: true,
    },
  ];

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
        <ArticleCategory meta={ meta.category } />
        <ul>
          {meta.tags && meta.tags.map((meta) => {
            return (
              <li key={ meta.slug }>
                <ArticleTag meta={ meta } />
              </li>
            );
          })}
        </ul>
        <ArticleMdx
          content={ content }
          tocContentSourceIdName={ tocContentSourceIdName }
        />
      </main>
      <div className={ styles["last-side"] }>TODO:ここにその他情報をのせる</div>
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
