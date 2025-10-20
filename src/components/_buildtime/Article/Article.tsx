import { ArticleCategoryList } from "@/components/ArticleCategoryList";
import { ArticleTagList } from "@/components/ArticleTagList/ArticleTagList";
import { BreadcrumbElement, Breadcrumbs } from "@/components/BreadCrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Profile } from "@/components/Profile";
import { ArticleMdx } from "@/components/_buildtime/Article/ArticleMdx";
import { ArticleMeta as ArticleMetaComponent } from "@/components/_buildtime/Article/ArticleMeta";
import { RelatedArticles } from "@/components/_buildtime/Article/RelatedArticles";
import { getAllCategories, getAllTags } from "@/lib/_buildtime/article";
import {
  articlesListPagePath,
  articleThumbnailNativeSize,
  createArticleDetailPath,
  createCategoryListPagePath,
  defaultArticleThumbnail
} from "@/lib/article";
import { author } from "@/lib/jsonLd/jsonLd";
import { countMarkdownCharacters, siteOrigin } from "@/lib/utils";
import { ArticleMeta, isArticleMeta, StaticArticleMeta } from "@/schemas/article/meta";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TechArticle, WebPage, WithContext } from "schema-dts";
import styles from "./Article.module.css";

const DynamicToc = dynamic(() =>
  import("@/components/TableOfContents").then((mod) => mod.TableOfContents)
);
const DynamicShareButtons = dynamic(() =>
  import("@/components/ShareButtons").then((mod) => mod.ShareButtons)
);
const DynamicAdSense = dynamic(() => 
  import("@/components/_buildtime/Article/AdSense").then(mod => mod.AdSense)
);

const tocContentSourceIdName = "toc-source-content";

export type ArticleComponentMeta = ArticleMeta | StaticArticleMeta;

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
  // 通常の記事化どうか：falseなら固定記事（aboutやcontact）
  const isArticle = isArticleMeta(meta);
  const breadcrumbs: BreadcrumbElement[] = createBreadcrumbs(meta);

  const WrappedShareButtons = (
    <div className={ styles["share-buttons-container"] }>
      <DynamicShareButtons slug={ shareUrl } title={ meta.title } />
    </div>
  );

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
          <ArticleMetaComponent meta={ meta } contentLength={ countMarkdownCharacters(content) } />
          <Image
            src={ meta.thumbnail ?? defaultArticleThumbnail }
            alt={ meta.title }
            width={ articleThumbnailNativeSize.width }
            height={ articleThumbnailNativeSize.height }
            fetchPriority="high"
            loading="eager"
          />
          {WrappedShareButtons}
          <hr />
          {isArticle && <DynamicAdSense adSenseType="display" /> }
          <ArticleMdx
            content={ content }
            tocContentSourceIdName={ tocContentSourceIdName }
            className="article-contents-container"
            isArticle={ isArticle }
          />
          <hr />
          <p>SNSやブログで記事をご紹介いただけたらうれしいです！</p>
          {WrappedShareButtons}
          {isArticle && 
            <>
              <hr />
              <RelatedArticles articleMeta={ meta }/>
            </>}
          {isArticle && <DynamicAdSense adSenseType="multiplex" /> }
        </main>
        <div className={ styles["last-side"] }>
          <Profile />
          <div
            className={ styles["ads-container"] }
            dangerouslySetInnerHTML={ {
              __html: `<a href="https://px.a8.net/svt/ejp?a8mat=3ZFGW2+FWR0QA+CO4+6Q74X" rel="nofollow">
            <img border="0" width="300" height="250" alt="XServerの広告" loading="lazy" src="https://www28.a8.net/svt/bgt?aid=240906818962&wid=001&eno=01&mid=s00000001642001130000&mc=1"></a>
            <img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=3ZFGW2+FWR0QA+CO4+6Q74X" alt="">`,
            } }
          />
          {isArticle && <DynamicAdSense adSenseType="display" /> }
          <ArticleCategoryList categories={ getAllCategories() } />
          <ArticleTagList tags={ getAllTags() } />
          {isArticle && <DynamicAdSense adSenseType="display" /> }
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
        href: createCategoryListPagePath(meta.category),
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
