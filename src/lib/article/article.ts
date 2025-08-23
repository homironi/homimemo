import {
  ArticleMeta,
  ArticleMetaFromJsonSchema,
  ArticleRawMeta,
  CategoriesMetaSchema,
  CategoryMeta,
  TagMeta,
  TagsMetaSchema,
} from "@/schemas/article/meta";
import articlesMetaJson from "@public/generated/meta/articles.json";
import categoriesMetaJson from "@public/generated/meta/categories.json";
import tagsMetaJson from "@public/generated/meta/tags.json";
import { array, parse } from "valibot";

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
export function filterArticlesCategory(
  articles: ArticleMeta[],
  category: CategoryMeta
): ArticleMeta[] {
  return articles.filter((meta) => meta.category.slug === category.slug);
}

/**
 * 指定カテゴリで記事をフィルターする
 * @param articles フォルター前の記事リスト
 * @param filterTag フィルターしたいタグ
 * @returns カテゴリでフィルターした記事リスト
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
 * すべての記事Metaを取得する
 * @returns 記事Metaの配列
 */
export function getAllArticlesMeta(): ArticleMeta[] {
  return parse(array(ArticleMetaFromJsonSchema), articlesMetaJson);
}

/**
 * 生の記事Metaを記事Metaに変換
 * @param raw 生Meta
 * @returns 記事Meta
 */
export function convertMetaFromRaw(raw: ArticleRawMeta): ArticleMeta {
  const tags = getTags(raw.tags ?? []);
  return {
    ...raw,
    category: getCategoryMeta(raw.category),
    tags: tags,
  };
}

/**
 * すべてのカテゴリMetaを取得する
 * @returns カテゴリMetaの配列
 */
export function getAllCategories(): CategoryMeta[] {
  return parse(CategoriesMetaSchema, categoriesMetaJson);
}

/**
 * カテゴリ名でカテゴリ情報を取得する
 * @param name 情報を取得したいカテゴリ名
 * @returns カテゴリ情報
 */
export function getCategoryMeta(name: string): CategoryMeta {
  const categories = getAllCategories();
  const find = categories.find((category) => category.name === name);
  if (!find) {
    throw new Error(`存在しないカテゴリ名です：${name}`);
  }

  return find;
}

/**
 * すべてのタグMetaを取得する
 * @returns タグMetaの配列
 */
export function getAllTags(): TagMeta[] {
  return parse(TagsMetaSchema, tagsMetaJson);
}

/**
 * カテゴリSlugでカテゴリ情報を取得する
 * @param slug 情報を取得したいカテゴリの slug
 * @returns カテゴリ情報
 */
export function getCategoryMetaFromSlug(slug: string): CategoryMeta {
  const categories = getAllCategories();
  const find = categories.find((category) => category.slug === slug);
  if (!find) {
    throw new Error(`存在しないカテゴリSlugです：${slug}`);
  }

  return find;
}

/**
 * 記事タグ情報の名前から対応する記事タグの情報配列を取得する
 * @param tagNames 記事タグ名のリスト
 * @returns 記事タグ情報の配列
 */
function getTags(tagNames: string[]): TagMeta[] {
  return tagNames.map((name) => {
    return getTag(name);
  });
}

/**
 * タグSlugでタグ情報を取得する
 * @param slug 情報を取得したいタグの slug
 * @returns タグ情報
 */
export function getTagMetaFromSlug(slug: string): TagMeta {
  const tags = getAllTags();
  const find = tags.find((tag) => tag.slug === slug);
  if (!find) {
    throw new Error(`存在しないタグSlugです：${slug}`);
  }

  return find;
}

/**
 * タグ名でタグ情報を取得する
 * @param name タグ名
 * @returns タグ情報
 */
function getTag(name: string): TagMeta {
  const tags = parse(TagsMetaSchema, tagsMetaJson);
  const find = tags.find((tag) => tag.name == name);
  if (!find) {
    throw new Error(`存在しないタグ名です：${name}`);
  }

  return find;
}
