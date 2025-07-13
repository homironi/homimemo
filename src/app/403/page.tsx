import { ErrorPage } from "@/components/ErrorPage";

/**
 * 403 Forbiddenページ
 * @returns 403エラーページ
 */
export default function Forbidden() {
  return (
    <ErrorPage
      errorCode="403"
      errorTitle="Forbidden"
      errorMessage="このページへのアクセス権がありません。"
    />
  );
}
