import { rehypeCodeLangLabel, rehypeCodeToolContainer, rehypeCopyButton } from "@/lib/rehypePlugins/code";
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

const DynamicToc = dynamic(() => import("@/components/TableOfContents"));
const DynamicCodeCopyHandler = dynamic(() => import("@/components/CopyCodeHandler"));
const tocContentSourceIdName = "toc-source-content";

/**
 * Next.jsのページで使用する静的パラメータを生成する関数
 * @returns 静的パラメータの配列
 */
export async function generateStaticParams() {
  return [
    { id: "20250429021614" }];
}

/**
 * 記事ページのコンポーネント
 * @returns 記事ページのJSX要素
 */
export default async function ArticlePage() {
  const raw = fs.readFileSync("_contents/articles/20250429021614.md", "utf-8");
  const { data, content } = matter(raw);
  const safeParsed = safeParse(ArticleMetaSchema, data);

  return (
    <div>
      <h2>frontMatter</h2>
      <p>
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
      </p>
      <DynamicCodeCopyHandler />
      <DynamicToc tocContentSourceIdName={ tocContentSourceIdName } />
      <h2>content</h2>
      <ArticleMDX content={ content } />
    </div>
  );
}

/**
 * 記事で使用するMDXRemoteコンポーネント
 * @param root0 オブジェクト引数
 * @param root0.content MDXコンテンツ
 * @returns MDXRemoteコンポーネント
 */
function ArticleMDX({ content }: { content: string }) {
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
            ],
          },
        } }
      />
    </div>
  );
}
