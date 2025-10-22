import {
  ArticleMeta,
  ArticleMetaFromJsonSchema,
  TagMeta
} from "@/schemas/article/meta";
import ArticleMetaJson from "@public/generated/meta/articles.json";
import { safeParse } from "valibot";

export const articleThumbnailNativeSize = { width: 1200, height: 630 };
export const defaultArticleThumbnail = "/images/header/default.webp";

/**
 * 記事詳細ページのパスを作成する
 * @param id 記事ID
 * @returns 記事詳細ページのパス
 */
export function createArticleDetailPath(id: string): string {
  return `/articles/${id}/`;
}

/**
 * 指定タグで記事をフィルターする
 * @param articles フォルター前の記事リスト
 * @param filterTag フィルターしたいタグ
 * @returns タグでフィルターした記事リスト
 * @description ほかで使用することがあれば定義を移動する
 */
export function filterArticlesTag(
  articles: ArticleMeta[],
  filterTag: TagMeta
): ArticleMeta[] {
  return articles.filter((meta) =>
    meta.tags?.find((tag) => tag.slug === filterTag.slug)
  );
}

/**
 * 指定したIDの記事Meta情報を取得する
 * @param id 記事ID
 * @returns 指定したIDの記事Meta情報
 */
export function getArticleMeta(id: string): ArticleMeta | null {
  const find = ArticleMetaJson.find((meta) => meta.id === id);
  if(find){
    const parsed = safeParse(ArticleMetaFromJsonSchema, find);
    if (parsed.success) {
      return parsed.output;
    }
  }

  return null;
}
