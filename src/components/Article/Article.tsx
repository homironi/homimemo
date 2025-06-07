import { rehypeCodeLangLabel, rehypeCodeToolContainer, rehypeCopyButton } from "@/lib/rehypePlugins/code";
import { rehypeGfmTaskList } from "@/lib/rehypePlugins/gfmTaskList";
import fs from "fs";
import matter from "gray-matter";
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
  filePath: string;
};

/**
 * 記事ページコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.filePath 記事のファイルパス
 * @returns 記事ページのコンポーネント
 */
export function Article({ filePath }: ArticleProps) {
  const raw = fs.readFileSync(filePath, "utf-8");

  // TODO: FrontMatterをもとにmeta設定やタイトルなどを設定する
  const { content } = matter(raw);

  return (
    <div className={ styles.container }>
      <DynamicCodeCopyHandler />
      <DynamicToc
        className={ styles.toc }
        tocContentSourceIdName={ tocContentSourceIdName }
      />
      <ArticleMdx
        className={ styles.article }
        content={ content }
        tocContentSourceIdName={ tocContentSourceIdName }
      />
      <div className={ styles["other-info"] }>TODO:ここにその他情報をのせる</div>
    </div>
  );
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
}: {
  className?: string;
  content: string;
  tocContentSourceIdName: string;
}) {
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
              [rehypePrism, { showLineNumbers: true }],
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
