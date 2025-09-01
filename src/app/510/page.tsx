import { ErrorPage } from "@/components/ErrorPage";

/**
 * 510 Not Extendedページ
 * @returns 510エラーページ
 */
export default function NotExtended() {
  return (
    <ErrorPage
      errorCode="510"
      errorTitle="Not Extended"
      errorMessage={<p>サイトへのアクセスが集中しています。</p>}
    />
  );
}
