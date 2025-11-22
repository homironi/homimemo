import { ArticleIdToPathMapElement, ArticleIdToPathMapElementSchema } from "@/schemas/article/idToPathMap";
import { ArticleMeta, ArticleMetaFromJsonSchema, articleMetaSchemaBase, StaticArticleMeta, StaticArticleMetaSchema, TagMeta, TagsMetaSchema } from "@/schemas/article/meta";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { array, minLength, object, parse, pipe, string, transform } from "valibot";

/**
 * 記事IDとそれに対応するマークダウンファイルのパスデータのファイルパス
 */
export const idToPathMapPath = path.join(".temp", "article", "idToPathMap.json");

/**
 * 記事情報ファイルのパス
 */
export const articlesMetaFilePath = path.join("public", "generated", "meta", "articles.json");

/**
 * タグの情報ファイルのパス
 */
export const tagsMetaFilePath = path.join("public", "generated", "meta", "tags.json");

/**
 * 記事のIDとファイルパスのマップのスキーマ
 */
const IdToPathMapSchema = array(ArticleIdToPathMapElementSchema);

/**
 * 記事IDに対応するマークダウンのファイルパスを取得する
 * @param id 記事ID
 * @returns 記事IDに対応するマークダウンファイルのパス
 */
export function getFilePath(id: string): string {
  const filePath = getIdToPathMap().find(item => item.id === id)?.filePath;
  if (!filePath) {
    throw new Error(`記事のファイルパスが見つかりません: ${id}`);
  }

  return filePath;
}

/**
 * 記事IDと対応するマークダウンファイルのパスのMapデータを取得
 * @returns 記事IDと対応するマークダウンファイルのパスのMapデータ
 */
export function getIdToPathMap(): ArticleIdToPathMapElement[] {
  return parse(IdToPathMapSchema, JSON.parse(fs.readFileSync(idToPathMapPath, "utf-8")));
}

/**
 * すべての記事Metaを取得する
 * @returns 記事Metaの配列
 */
export function getAllArticlesMeta(): ArticleMeta[] {
  return parse(array(ArticleMetaFromJsonSchema), JSON.parse(fs.readFileSync(articlesMetaFilePath, "utf-8")));
}

/**
 * 記事メタデータFrontmatterからのスキーマ
 * @description Frontmatterから取得したデータをArticleMetaに変換するためのスキーマ
 */
const ArticleMetaFromFrontmatterSchema = object({
  ...articleMetaSchemaBase,
  tags: pipe(array(string()), minLength(1), transform(raw => raw.map((name) => getTagMetaFromName(name)))),
});

/**
 * Frontmatterを記事Metaに変換
 * @param raw Frontmatter生Meta
 * @returns 記事Meta
 */
export function convertMetaFromFrontmatter(raw: unknown): ArticleMeta {
  return parse(ArticleMetaFromFrontmatterSchema, raw);
}

/**
 * すべてのタグMetaを取得する
 * @returns タグMetaの配列
 */
export function getAllTags(): TagMeta[] {
  return parse(TagsMetaSchema, JSON.parse(fs.readFileSync(tagsMetaFilePath, "utf-8")));
}

/**
 * タグSlugでタグ情報を取得する
 * @param slug 情報を取得したいタグの slug
 * @returns タグ情報
 */
export function getTagMetaFromSlug(slug: string): TagMeta {
  const tags = getAllTags();
  const find = tags.find(tag => tag.slug === slug);
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
export function getTagMetaFromName(name: string): TagMeta {
  const tags = parse(TagsMetaSchema, JSON.parse(fs.readFileSync(tagsMetaFilePath, "utf-8")));
  const find = tags.find(tag => tag.name == name);
  if (!find) {
    throw new Error(`タグ名がみつかりませんでした：${name}`);
  }

  return find;
}

/**
 * 記事のマークダウンファイルを読み込み、Meta情報とコンテンツを取得する
 * @param filePath 記事のマークダウンファイルのパス
 * @returns 記事のMeta情報とコンテンツ
 */
export function readStaticArticleContent(filePath: string): { meta: StaticArticleMeta; content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const meta = parse(StaticArticleMetaSchema, data);
  return { meta, content };
}
