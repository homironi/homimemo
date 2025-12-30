import { createArticleDetailPath } from "@/lib/article";

/**
 * HOMEのお知らせデータ
 */
export const noticeData = [
  {
    date: "2025/12/26",
    html: `<a href="${createArticleDetailPath("qh166qblptc3q4m1yoxqxus5")}">サイトのフレームワークをAstroに移行しました（近日中に記事公開予定）</a>`,
  },
  {
    date: "2025/09/03",
    html: "サイトをCloudflare Workersに移行しました",
  },
  {
    date: "2025/07/13",
    html: `<a href="${createArticleDetailPath("u7ax9hdyzzu3zkp5grbjazmt")}">サイトをNext.jsを中心としたSSGにリニューアルしました</a>`,
  },
  {
    date: "2023/12/04",
    html: (
      `<a href="${createArticleDetailPath("fdjs9rs2bn7ugq9rf8ysa28h")}">ダークテーマ対応してみました。</a>
        OSのテーマ設定に合わせて自動で切り替わります`
    ),
  },
  {
    date: "2023/08/23",
    html: `<a href="${createArticleDetailPath("qnhckrrtrx8xv662s0ox840y")}">サイト公開</a>`,
  },
];
