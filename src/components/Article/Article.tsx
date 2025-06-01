import { rehypeCodeLangLabel, rehypeCodeToolContainer, rehypeCopyButton } from "@/lib/rehypePlugins/code";
import { rehypeGfmTaskList } from "@/lib/rehypePlugins/gfmTaskList";
import { ArticleMetaSchema } from "@/schemas/articleMeta";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { safeParse } from "valibot";
import "./prism.css"; // 記事内で使用するコードハイライトのPrismのスタイルを適用するためにインポート

const DynamicToc = dynamic(() => import("@/components/TableOfContents").then(mod => mod.default));
const DynamicCodeCopyHandler = dynamic(() => import("@/components/CopyCodeHandler").then(mod => mod.default));
const tocContentSourceIdName = "toc-source-content";

type Props = {
  filePath: string;
};

/**
 * 記事ページコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.filePath 記事のファイルパス
 * @returns 記事ページのコンポーネント
 */
export function Article({ filePath }: Props) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const safeParsed = safeParse(ArticleMetaSchema, data);

  return (
    <div>
      <h2>frontMatter</h2>
      <div>
        {safeParsed.success
          ? JSON.stringify(safeParsed.output)
          : safeParsed.issues.map((issue, index) => {
              return (
                <div key={ index }>
                  <p>{issue.message}</p>
                  <p>{issue.type}</p>
                  <p>{issue.expected}</p>
                </div>
              );
            },
            )}
      </div>
      <DynamicCodeCopyHandler />
      <DynamicToc tocContentSourceIdName={ tocContentSourceIdName } />
      <h2>content</h2>
      <ArticleMdx content={ content } tocContentSourceIdName={ tocContentSourceIdName } />
    </div>
  );
}

/**
 * 記事ページコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.content 記事のMDXコンテンツ
 * @param root0.tocContentSourceIdName 目次のコンテンツソースとして扱う目印のID名
 * @returns 記事ページのコンポーネント
 */
function ArticleMdx({
  content,
  tocContentSourceIdName,
}: {
  content: string;
  tocContentSourceIdName: string;
}) {
  return (
    <div id={ tocContentSourceIdName }>
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
    </div>
  );
}
