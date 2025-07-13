import { ErrorPage } from "@/components/ErrorPage";

/**
 * 500 Internal Server Errorページ
 * @returns 500エラーページ
 */
export default function InternalServerError() {
  return (
    <ErrorPage
      errorCode="500"
      errorTitle="Internal Server Error"
      errorMessage={ (
        <p>サーバー側に問題が発生しています！</p>
      ) }
    />
  );
}
