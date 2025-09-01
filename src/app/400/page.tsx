import { ErrorPage } from "@/components/ErrorPage";

/**
 * 400 Bad Requestページ
 * @returns 400エラーページ
 */
export default function BadRequest() {
  return (
    <ErrorPage
      errorCode="400"
      errorTitle="Bad Request"
      errorMessage={
        <>
          <p>URL のスペルを確認してみてください。</p>
          <p>それでもだめなら、キャッシュと Cookie の消去をお試しください。</p>
          <p>
            お使いのブラウザによって操作方法は異なります。参考に Google Chrome
            の公式ヘルプを載せておきます。
          </p>
          <p>
            <a
              href="https://support.google.com/accounts/answer/32050?hl=ja&co=GENIE.Platform%3DDesktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              【Google Chrome】キャッシュと Cookie の消去
            </a>
          </p>
        </>
      }
    />
  );
}
