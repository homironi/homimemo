import { ErrorPage } from "@/components/ErrorPage";

/**
 * 401 Unauthorizedページ
 * @returns 401エラーページ
 */
export default function Unauthorized() {
  return (
    <ErrorPage
      errorCode="401"
      errorTitle="Unauthorized"
      errorMessage={ (
        <>
          <p>認証に失敗しました。</p>
          <p>当サイトには ID やパスワードを入力していただくページはありません。</p>
          <p>サイトへ戻ってお楽しみください。</p>
        </>
      ) }
    />
  );
}
