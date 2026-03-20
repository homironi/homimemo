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
  const YYYY = zeroPad(date.getFullYear(), 4);
  const MM = zeroPad(date.getMonth() + 1, 2);
  const DD = zeroPad(date.getDate(), 2);

  switch (format) {
    case "YYYY-MM-DD":
      return `${YYYY}-${MM}-${DD}`;

    case "YYYY/MM/DD":
      return `${YYYY}/${MM}/${DD}`;

    case "YYYYMMDDHHmmss":{
      const HH = zeroPad(date.getHours(), 2);
      const mm = zeroPad(date.getMinutes(), 2);
      const ss = zeroPad(date.getSeconds(), 2);

      return `${YYYY}${MM}${DD}${HH}${mm}${ss}`;
    }
      
    default:
      // SupportedDateFormatに新しいフォーマットを追加した場合、switch文にケースを追加し忘れたらコンパイルエラーになるようにして気付きやすくするためのコード
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
      const _exhaustiveCheck: never = format;
      throw new Error(`Unsupported date format: ${format}`);
  }
}

/**
 * 0埋めする関数
 * @param num 0埋めしたい数値
 * @param length 0埋め後の文字列の長さ
 * @returns 0埋めされた文字列
 */
function zeroPad(num: number, length: number): string {
  return num.toString().padStart(length, "0");
}
