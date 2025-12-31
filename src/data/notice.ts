import { createArticleDetailPath } from "@/lib/article";

/**
 * HOMEのお知らせデータ
 */
export const noticeData = [
  {
    date: "2025/12/26",
    text: "サイトのフレームワークをAstroに移行しました",
    link: createArticleDetailPath("qh166qblptc3q4m1yoxqxus5"),
  },
  {
    date: "2025/09/03",
    text: "サイトをCloudflare Workersに移行しました",
  },
  {
    date: "2025/07/13",
    text: "サイトをNext.jsを中心としたSSGにリニューアルしました",
    link: createArticleDetailPath("u7ax9hdyzzu3zkp5grbjazmt"),
  },
  {
    date: "2023/12/04",
    text: "ダークテーマ対応してみました。OSのテーマ設定に合わせて自動で切り替わります",
    link: createArticleDetailPath("fdjs9rs2bn7ugq9rf8ysa28h"),
  },
  {
    date: "2023/08/23",
    text: "サイト公開",
    link: createArticleDetailPath("qnhckrrtrx8xv662s0ox840y"),
  },
];
