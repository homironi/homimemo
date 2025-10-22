import { getAllTags } from "@/lib/_buildtime/article";
import { createDefaultOG, createDefaultTwitter } from "@/lib/utils";
import type { Metadata } from "next";
import { TagLink } from "./_components/TagLink";
import styles from "./page.module.css";

const title = "タグ一覧";
const description ="サイト内で扱っているタグの一覧ページです。";

/**
 * Next.jsのページで使用する静的Meta情報の生成
 * @returns Meta情報
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    openGraph: createDefaultOG(title, description, "/tags/"),
    twitter: createDefaultTwitter(title, description),
  };
}

/**
 * タグごとの記事一覧ページのコンポーネント
 * @returns 記事ページのJSX要素
 */
export default async function Page() {
  const tags = getAllTags().sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>{title}</h1>
      <ul className={ styles.tags }>
        {tags.map(tag=>(<li  key={ tag.slug }><TagLink tag={ tag } /></li>))}
      </ul>
    </div>
  );
}
