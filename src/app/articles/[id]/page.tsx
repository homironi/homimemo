import { ArticleMetaSchema } from "@/schemas/articleMeta";
import fs from "fs";
import matter from "gray-matter";
import { is } from "valibot";

export async function generateStaticParams() {
  return [
    { id: "20250429021614" }];
}

export default function ArticlePage() {
  const raw = fs.readFileSync("_contents/articles/20250429021614.md", "utf-8");
  const { data, content } = matter(raw);

  return (
    <div>
      <h2>frontMatter</h2>
      <p>
        {is(ArticleMetaSchema, data)
          ? JSON.stringify(data)
          : "frontmatter の パースに失敗しました"}
      </p>
      <h2>content</h2>
      <p>
        { content}
      </p>
    </div>
  );
}
