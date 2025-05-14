import fs from "fs";
import matter from "gray-matter";

export async function generateStaticParams() {
  return [
    { id: "20250429021614" }];
}

export default function ArticlePage() {
  const raw = fs.readFileSync("_contents/articles/20250429021614.md", "utf-8");
  const { data, content } = matter(raw);
  fs.writeFileSync("_contents/articles/20250429021614.md", matter.stringify(content, data));
  return (
    <div>
      <h2>frontMatter</h2>
      <p>
        { JSON.stringify(data) }
      </p>
      <h2>content</h2>
      <p>
        { content}
      </p>
    </div>
  );
}
