import { LastModeDateIcon, PublishDateIcon } from "@/assets/icons";
import { ArticleCategory } from "@/components/ArticleCategory";
import { ArticleCategoryList } from "@/components/ArticleCategoryList";
import { ArticleTagList } from "@/components/ArticleTagList/ArticleTagList";
import { ArticleTags } from "@/components/ArticleTags";
import { BreadcrumbElement, Breadcrumbs } from "@/components/BreadCrumbs";
import { ExternalLink } from "@/components/ExternalLink";
import { H2 } from "@/components/H2";
import { H3 } from "@/components/H3";
import { Profile } from "@/components/Profile";
import { CardPreviewUrl } from "@/components/server/CardPreviewUrl";
import { TextBlock } from "@/components/TextBlock";
import {
  articlesListPagePath,
  articleThumbnailNativeSize,
  createArticleDetailPath,
  createCategoryListFirstPagePath,
  defaultArticleThumbnail,
} from "@/lib/article";
import { formatDate } from "@/lib/date";
import { getAllCategories, getAllTags } from "@/lib/server/article";
import {
  rehypeCodeLangLabel,
  rehypeCodeToolContainer,
  rehypeCopyButton,
} from "@/lib/server/rehypePlugins/code";
import { rehypeGfmTaskList } from "@/lib/server/rehypePlugins/gfmTaskList";
import { ArticleMeta, StaticArticleMeta } from "@/schemas/article/meta";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { object, pipe, safeParse, string, url } from "valibot";
import styles from "./Article.module.css";
import "./blockquote.css"; // 引用のスタイルを適用するためにインポート
import "./inlineCode.css"; // インラインコードのスタイルを適用するためにインポート
import "./list.css";
import "./prism.css"; // 記事内で使用するコードハイライトのPrismのスタイルを適用するためにインポート
import "./table.css";

const DynamicToc = dynamic(() =>
  import("@/components/TableOfContents").then((mod) => mod.TableOfContents)
);
const DynamicCodeCopyHandler = dynamic(() =>
  import("@/components/CopyCodeHandler").then((mod) => mod.default)
);
const DynamicShareButtons = dynamic(() =>
  import("@/components/ShareButtons").then((mod) => mod.ShareButtons)
);

const tocContentSourceIdName = "toc-source-content";

type ArticleComponentMeta = ArticleMeta | StaticArticleMeta;

export type ArticleProps = {
  meta: ArticleComponentMeta;
  content: string;
  shareSlug: string;
};

/**
 * 記事ページコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.meta 記事のMeta
 * @param root0.content 記事内容
 * @returns 記事ページのコンポーネント
 */
export function Article({ meta, content, shareSlug: shareUrl }: ArticleProps) {
  const breadcrumbs: BreadcrumbElement[] = createBreadcrumbs(meta);

  const publishDateText = formatDate(meta.publishDate, "YYYY/MM/DD");
  const lastModDateText = formatDate(meta.lastModDate, "YYYY/MM/DD");

  const WrappedShareButtons = (
    <div className={styles["share-buttons-container"]}>
      <DynamicShareButtons slug={shareUrl} title={meta.title} />
    </div>
  );

  return (
    <div className={styles.container}>
      <DynamicCodeCopyHandler />
      <div className={styles["first-side"]}>
        <div className={styles["toc-container"]}>
          <DynamicToc tocContentSourceIdName={tocContentSourceIdName} />
        </div>
      </div>
      <main className={styles.article}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1>{meta.title}</h1>
        <div className={styles["meta-container"]}>
          <div className={styles["date-container"]}>
            <span>
              <PublishDateIcon className={styles.icon} />
              <time dateTime={formatDate(meta.publishDate, "YYYY-MM-DD")}>
                {publishDateText}
              </time>
            </span>
            {/* 日付が違う時だけ更新があったとして更新日時を表示する。同じ日の場合は表示しない */}
            {publishDateText !== lastModDateText && (
              <span>
                <LastModeDateIcon className={styles.icon} />
                <time dateTime={formatDate(meta.lastModDate, "YYYY-MM-DD")}>
                  {lastModDateText}
                </time>
              </span>
            )}
          </div>
          {isArticleMeta(meta) && <ArticleCategory meta={meta.category} />}
          {isArticleMeta(meta) && meta.tags && <ArticleTags tags={meta.tags} />}
        </div>
        <Image
          src={meta.thumbnail ?? defaultArticleThumbnail}
          alt={meta.title}
          width={articleThumbnailNativeSize.width}
          height={articleThumbnailNativeSize.height}
        />
        {WrappedShareButtons}
        <ArticleMdx
          content={content}
          tocContentSourceIdName={tocContentSourceIdName}
          className="article-contents-container"
        />
        <hr />
        {WrappedShareButtons}
      </main>
      <div className={styles["last-side"]}>
        <Profile />
        <div
          className={styles["ads-container"]}
          dangerouslySetInnerHTML={{
            __html: `<a href="https://px.a8.net/svt/ejp?a8mat=3ZFGW2+FWR0QA+CO4+6Q74X" rel="nofollow">
          <img border="0" width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=240906818962&wid=001&eno=01&mid=s00000001642001130000&mc=1"></a>
          <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3ZFGW2+FWR0QA+CO4+6Q74X" alt="">`,
          }}
        />
        <ArticleCategoryList categories={getAllCategories()} />
        <ArticleTagList tags={getAllTags()} />
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
 * 見出しコンポーネントのファクトリー関数
 * @param Tag 見出しタグ名
 * @returns 見出しコンポーネント
 */
const createHeadingComponent = (Tag: "h1" | "h4" | "h5" | "h6") => {
  return function HeadingComponent({
    children,
    ...props
  }: PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
    const processedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === ExternalLink) {
        const {
          href,
          children: childChildren,
          ...anchorProps
        } = child.props as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
          children?: React.ReactNode;
        };
        return (
          <a href={href} {...anchorProps}>
            {childChildren}
          </a>
        );
      }
      return child;
    });

    return <Tag {...props}>{processedChildren}</Tag>;
  };
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
    <article id={tocContentSourceIdName} className={className ?? ""}>
      <MDXRemote
        source={content}
        components={{
          p: CustomParagraph,
          a: ExternalLink,
          h1: createHeadingComponent("h1"),
          h2: H2,
          h3: H3,
          h4: createHeadingComponent("h4"),
          h5: createHeadingComponent("h5"),
          h6: createHeadingComponent("h6"),
          TextBlock,
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
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
        }}
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
        href: createArticleDetailPath(meta.id),
        isCurrent: true,
      },
    ];
  } else {
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

const childrenAnchorPropsSchema = object({
  children: pipe(string(), url()),
  href: pipe(string(), url()),
});

export const CustomParagraph = async ({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) => {
  // 子要素が1つのテキストノードで、それがURLの場合はカード表示する
  if (
    children &&
    React.Children.count(children) === 1 &&
    typeof children === "object" &&
    React.isValidElement(children)
  ) {
    const validatedChildrenProps = safeParse(
      childrenAnchorPropsSchema,
      children.props
    );
    if (validatedChildrenProps.success) {
      const { href } = validatedChildrenProps.output;
      const trimmedHref = href.trim();
      return <CardPreviewUrl url={trimmedHref} />;
    }
  }

  return <p {...props}>{children}</p>;
};
