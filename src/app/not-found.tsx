import { ErrorPage } from "@/components/ErrorPage";

/**
 * 404 Not Foundページ
 * @returns 404エラーページ
 */
export default function NotFound() {
  return (
    <ErrorPage
      errorCode="404"
      errorTitle="Not Found"
      errorMessage="ページが削除された可能性があります。"
    />
  );
}
