export type SupportedDateFormat =
  | "YYYY/MM/DD" 
  | "YYYY-MM-DD"
  | "YYYYMMDDHHmmss";

/**
 * 日付オブジェクトを文字列に変換する関数
 * @param date 日付オブジェクト
 * @param format 日付のフォーマットタイプ
 * @returns 日付を指定されたフォーマットの文字列に変換
 * @description 必要なフォーマットが増えたら、switch文に追加する
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

    case "YYYYMMDDHHmmss":{
      const yearStr = date.getFullYear().toString().padStart(4, "0");
      const monthStr = (date.getMonth()+1).toString().padStart(2, "0");
      const dateStr = date.getDate().toString().padStart(2, "0");
      const hourStr = date.getHours().toString().padStart(2, "0");
      const minutesStr =date.getMinutes().toString().padStart(2, "0");
      const secondsStr = date.getSeconds().toString().padStart(2, "0");

      return `${yearStr}${monthStr}${dateStr}${hourStr}${minutesStr}${secondsStr}`;
    }
      
    default:
      throw new Error(`Unsupported date format: ${format}`);
  }
}
