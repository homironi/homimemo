import { ArticleIcon, LastModeDateIcon, MenuBookIcon, PublishDateIcon } from "@/assets/icons";
import { ArticleCategory } from "@/components/ArticleCategory";
import { ArticleCategoryList } from "@/components/ArticleCategoryList";
import { ArticleTagList } from "@/components/ArticleTagList/ArticleTagList";
import { ArticleTags } from "@/components/ArticleTags";
import { BreadcrumbElement, Breadcrumbs } from "@/components/BreadCrumbs";
import { CodeBlock } from "@/components/CodeBlock";
import { ExternalLink } from "@/components/ExternalLink";
import { H2 } from "@/components/H2";
import { H3 } from "@/components/H3";
import { JsonLd } from "@/components/JsonLd";
import { Profile } from "@/components/Profile";
import { RelatedArticles } from "@/components/server/Article/RelatedArticles";
import { CardPreviewUrl } from "@/components/server/CardPreviewUrl";
import { TextBlock } from "@/components/TextBlock";
import
  {
    articlesListPagePath,
    articleThumbnailNativeSize,
    createArticleDetailPath,
    createCategoryListFirstPagePath,
    defaultArticleThumbnail,
  } from "@/lib/article";
import { formatDate } from "@/lib/date";
import { author } from "@/lib/jsonLd/jsonLd";
import { getAllCategories, getAllTags } from "@/lib/server/article";
import { codeContainerClassName, rehypeCodeContainer } from "@/lib/server/rehypePlugins/code";
import { rehypeGfmTaskList } from "@/lib/server/rehypePlugins/gfmTaskList";
import { siteOrigin } from "@/lib/utils";
import { ArticleMeta, StaticArticleMeta } from "@/schemas/article/meta";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { isValidElement, PropsWithChildren } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { TechArticle, WebPage, WithContext } from "schema-dts";
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
 * @param root0.shareSlug 共有に使う記事のスラッグ
 * @returns 記事ページのコンポーネント
 */
export function Article({ meta, content, shareSlug: shareUrl }: ArticleProps) {
  const breadcrumbs: BreadcrumbElement[] = createBreadcrumbs(meta);

  const publishDateText = formatDate(meta.publishDate, "YYYY/MM/DD");
  const lastModDateText = formatDate(meta.lastModDate, "YYYY/MM/DD");

  const contentLength = countMarkdownCharacters(content);
  const readPerMinutes = 400;
  const readTime = Math.round(contentLength / readPerMinutes);

  const WrappedShareButtons = (
    <div className={ styles["share-buttons-container"] }>
      <DynamicShareButtons slug={ shareUrl } title={ meta.title } />
    </div>
  );

  const isArticle = isArticleMeta(meta);

  return (
    <>
      <div className={ styles.container }>
        <div className={ styles["first-side"] }>
          <div className={ styles["toc-container"] }>
            <DynamicToc tocContentSourceIdName={ tocContentSourceIdName } />
          </div>
        </div>
        <main className={ styles.article }>
          <Breadcrumbs breadcrumbs={ breadcrumbs } />
          <h1>{meta.title}</h1>
          <div className={ styles["meta-container"] }>
            <div className={ styles["date-container"] }>
              <span>
                <PublishDateIcon className={ styles.icon } />
                <time dateTime={ formatDate(meta.publishDate, "YYYY-MM-DD") }>
                  {publishDateText}
                </time>
              </span>
              {/* 日付が違う時だけ更新があったとして更新日時を表示する。同じ日の場合は表示しない */}
              {publishDateText !== lastModDateText && (
                <span>
                  <LastModeDateIcon className={ styles.icon } />
                  <time dateTime={ formatDate(meta.lastModDate, "YYYY-MM-DD") }>
                    {lastModDateText}
                  </time>
                </span>
              )}
            </div>
            {isArticle && <ArticleCategory meta={ meta.category } />}
            {isArticle && meta.tags && <ArticleTags tags={ meta.tags } />}
            <p className={ styles["meta-text"] }><ArticleIcon className={ styles.icon }/>{contentLength} 文字</p>
            <p className={ styles["meta-text"] }><MenuBookIcon className={ styles.icon }/>{` ${readTime} 分（${readPerMinutes} 文字 / 分）`}</p>
          </div>
          <Image
            src={ meta.thumbnail ?? defaultArticleThumbnail }
            alt={ meta.title }
            width={ articleThumbnailNativeSize.width }
            height={ articleThumbnailNativeSize.height }
          />
          {WrappedShareButtons}
          <ArticleMdx
            content={ content }
            tocContentSourceIdName={ tocContentSourceIdName }
            className="article-contents-container"
          />
          <hr />
          {WrappedShareButtons}
          {isArticle && 
            <>
              <hr />
              <RelatedArticles articleMeta={ meta }/>
            </>}
        </main>
        <div className={ styles["last-side"] }>
          <Profile />
          <div
            className={ styles["ads-container"] }
            dangerouslySetInnerHTML={ {
              __html: `<a href="https://px.a8.net/svt/ejp?a8mat=3ZFGW2+FWR0QA+CO4+6Q74X" rel="nofollow">
            <img border="0" width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=240906818962&wid=001&eno=01&mid=s00000001642001130000&mc=1"></a>
            <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3ZFGW2+FWR0QA+CO4+6Q74X" alt="">`,
            } }
          />
          <ArticleCategoryList categories={ getAllCategories() } />
          <ArticleTagList tags={ getAllTags() } />
        </div>
      </div>
      { isArticle
        ? <JsonLd schema={ createArticleJsonLd(meta) } />
        : <JsonLd schema={ createStaticArticleJsonLd(meta) } />
      }
    </>
  );
}

function createArticleJsonLd(meta:ArticleMeta):WithContext<TechArticle>{
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    author: author,
    dateModified: meta.lastModDate.toISOString(),
    datePublished: meta.publishDate.toISOString(),
    headline: meta.title,
    image: meta.thumbnail ? `${siteOrigin}${meta.thumbnail}` : undefined,
  };
}

const staticArticleJsonLdMap = new Map<string, Omit<WithContext<WebPage>, "@context">>([
  ["about", {
    "@type": "AboutPage",
  }],
  ["profile", {
    "@type": "ProfilePage",
    mainEntity: author,
  }],
  ["contact", {
    "@type": "ContactPage",
  }],
]);

function createStaticArticleJsonLd(meta: StaticArticleMeta): WithContext<WebPage>{
  const data:Omit<WithContext<WebPage>, "@context"> = staticArticleJsonLdMap.get(meta.slug)
    ?? {
    "@type": "WebPage",
  };

  return {
    ...data,
    "@context": "https://schema.org",
    dateCreated: meta.publishDate.toISOString(),
    dateModified: meta.lastModDate.toISOString(),
  };
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
function createHeadingComponent(Tag: "h1" | "h4" | "h5" | "h6") {
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
          <a href={ href } { ...anchorProps }>
            {childChildren}
          </a>
        );
      }
      return child;
    });

    return <Tag { ...props }>{processedChildren}</Tag>;
  };
}

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
    <article id={ tocContentSourceIdName } className={ className ?? "" }>
      <MDXRemote
        source={ content }
        components={ {
          p: CustomParagraph,
          a: ExternalLink,
          h1: createHeadingComponent("h1"),
          h2: H2,
          h3: H3,
          h4: createHeadingComponent("h4"),
          h5: createHeadingComponent("h5"),
          h6: createHeadingComponent("h6"),
          div: CustomDiv,
          TextBlock,
        } }
        options={ {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              rehypeAutolinkHeadings,
              rehypeCodeTitles,
              [rehypePrism],
              rehypeCodeContainer,
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
      return <CardPreviewUrl url={ trimmedHref } />;
    }
  }

  return <p { ...props }>{children}</p>;
};


/**
 * <div> 要素を処理するコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.className クラス名
 * @param root0.children 子要素
 * @param root0.props その他のプロパティ
 * @returns <div> 要素のJSX要素
 */
function CustomDiv({className, children,...props}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  // コードブロックコンテナの処理
  if(className?.includes(codeContainerClassName)  && children){
    // childrenが配列の時はタイトル付きコードブロック
    if(Array.isArray(children) && children.length >= 2){
      const childrenArray = children as React.ReactNode[];
      const titleElement = childrenArray[0] as React.ReactHTMLElement<HTMLDivElement>;
      const title = titleElement.props.children?.toString();
      const preElement = childrenArray[1] as React.ReactHTMLElement<HTMLPreElement>;
      return (
        <div className={ className } { ...props }>
          <CodeBlock title={ title } { ...preElement.props } />
        </div>
      );
    }
    else if(isValidElement(children) && children.type === "pre"){
      // タイトルなしコードブロック
      const childrenElement = children as React.ReactHTMLElement<HTMLPreElement>;
      return (
        <div className={ className } { ...props }>
          <CodeBlock { ...childrenElement.props } />
        </div>
      );
    }
  }

  return <div className={ className } { ...props } >{children}</div>;
}

/**
 * マークダウンテキストから記法を除いた純粋な文字数をカウントする
 * @param markdown マークダウン形式の文字列
 * @returns 純粋な文字数
 */
export function countMarkdownCharacters(markdown: string): number {
  let text = markdown;

  // コードブロック（```で囲まれた部分）を先に処理
  text = text.replace(/```[\s\S]*?```/g, (match) => {
    // コードブロック内の改行以外の文字をカウント
    const codeContent = match.replace(/```[^\n]*\n?/g, "").replace(/\n```$/g, "");
    return codeContent;
  });

  // インラインコード（`で囲まれた部分）
  text = text.replace(/`([^`]+)`/g, "$1");

  // 見出し（# ## ### など）
  text = text.replace(/^#+\s*/gm, "");

  // 太字・斜体記法
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "$1"); // 太字斜体
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");     // 太字
  text = text.replace(/\*(.+?)\*/g, "$1");         // 斜体
  text = text.replace(/___(.+?)___/g, "$1");       // 太字斜体
  text = text.replace(/__(.+?)__/g, "$1");         // 太字
  text = text.replace(/_(.+?)_/g, "$1");           // 斜体

  // 取り消し線
  text = text.replace(/~~(.+?)~~/g, "$1");

  // リンク記法 [テキスト](URL)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // 画像記法 ![alt](URL)
  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, "");
  
  // チェックリスト（- [ ] または - [x] で始まる行）
  text = text.replace(/^[\s]*[-*+]\s*\[[\sx]\]\s*/gmi, "");

  // リスト記法（- * + で始まる行）
  text = text.replace(/^[\s]*[-*+]\s+/gm, "");

  // 番号付きリスト（1. 2. など）
  text = text.replace(/^[\s]*\d+\.\s+/gm, "");

  // テーブル記法の処理
  text = text.replace(/^\s*\|.*\|\s*$/gm, (match) => {
    // テーブルの区切り行（|---|---|）を除外
    if (/^\s*\|[\s\-|:]*\|\s*$/.test(match)) {
      return "";
    }
    // テーブルのセル内容のみを抽出（|を除去してセルの内容を結合）
    return match
      .split("|")
      .slice(1, -1) // 最初と最後の空文字を除去
      .map(cell => cell.trim())
      .join(" ") + "\n";
  });

  // 引用記法（> で始まる行）
  text = text.replace(/^[\s]*>\s*/gm, "");

  // 水平線（--- *** ___）
  text = text.replace(/^[\s]*[-*_]{3,}[\s]*$/gm, "");

  // HTMLタグ（マークダウン内のHTML）
  text = text.replace(/<[^>]+>/g, "");

  // 参照リンク記法 [text][ref] と [ref]: URL
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1");
  text = text.replace(/^[\s]*\[[^\]]+\]:\s*.+$/gm, "");

  // エスケープ文字（\）
  text = text.replace(/\\(.)/g, "$1");

  // 余分な空白行を整理
  text = text.replace(/\n\s*\n/g, "\n");
  text = text.trim();
  
  return text.length;
}
