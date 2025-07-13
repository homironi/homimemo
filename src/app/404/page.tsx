import { ErrorPage } from "@/components/ErrorPage";

/**
 * 404 Not Foundページ
 * @returns 404エラーページ
 */
export default function NotFoundPage() {
  return (
    <ErrorPage
      errorCode="404"
      errorTitle="Not Found"
      errorMessage="ページが削除された可能性があります。"
    />
  );
}
