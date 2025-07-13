import { ArticleMeta, CategoryMeta, TagMeta } from "@/schemas/article/meta";

export const articleThumbnailNativeSize = { width: 896, height: 504 };
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
 * 指定カテゴリで記事をフィルターする
 * @param articles フォルター前の記事リスト
 * @param category フィルターしたいカテゴリ
 * @returns カテゴリでフィルターした記事リスト
 * @description ほかで使用することがあれば定義を移動する
 */
export function filterArticlesCategory(articles: ArticleMeta[], category: CategoryMeta): ArticleMeta[] {
  return articles.filter(meta => meta.category.slug === category.slug);
}

/**
 * 指定カテゴリで記事をフィルターする
 * @param articles フォルター前の記事リスト
 * @param filterTag フィルターしたいタグ
 * @returns カテゴリでフィルターした記事リスト
 * @description ほかで使用することがあれば定義を移動する
 */
export function filterArticlesTag(articles: ArticleMeta[], filterTag: TagMeta): ArticleMeta[] {
  return articles.filter(meta => meta.tags?.find(tag => tag.slug === filterTag.slug));
}
