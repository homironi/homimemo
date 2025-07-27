export type SupportedDateFormat = "YYYY/MM/DD" | "YYYY-MM-DD";

/**
 * 日付オブジェクトを文字列に変換する関数
 * @param date 日付オブジェクト
 * @param format 日付のフォーマットタイプ
 * @returns 日付を指定されたフォーマットの文字列に変換
 * @description 必要なフォーマットが増えたら、switch文に追加する
 * @throws UnsupportedDateFormat エラーが発生した場合、サポートされていないフォーマットが指定されたことを示す
 */
export function formatDate(date: Date, format: SupportedDateFormat): string {
  switch (format) {
    case "YYYY-MM-DD":
      return date.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

    case "YYYY/MM/DD":
      return date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

    default:
      throw new Error(`Unsupported date format: ${format}`);
  }
}
