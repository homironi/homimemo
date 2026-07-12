import type { ArticleMeta } from "@/schemas/article/meta";

export interface YearArchive {
  year: number
  count: number
};

/**
 * ArchiveComponent用のデータを作成する
 * @param articles 記事
 * @returns ArchiveComponent用のデータ
 */
export function createArchiveByYear(articles: ArticleMeta[]): YearArchive[] {
  const archive = articles.reduce((acc, current) => {
    const year = current.publishDate.getFullYear();
    acc.set(year, (acc.get(year) || 0) + 1);
    return acc;
  }, new Map<number, number>());

  return Array.from(archive)
    .map<YearArchive>(entry => ({ year: entry[0], count: entry[1] }))
    .sort((a, b) => b.year - a.year);
};
