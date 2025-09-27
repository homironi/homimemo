import { createArticleDetailPath } from "@/lib/article";
import Link from "next/link";
import { JSX } from "react";

type NoticeData = {
  id: string;
  date: string;
  description: JSX.Element;
};

/**
 * HOMEのお知らせデータ
 */
export const noticeData: Omit<NoticeData, "id">[] = [
  {
    date: "2025-09-03",
    description: <>サイトをCloudflare Workersに移行しました</>,
  },
  {
    date: "2025-07-13",
    description: <Link href={ createArticleDetailPath("u7ax9hdyzzu3zkp5grbjazmt") }>サイトをNext.jsを中心としたSSGにリニューアルしました</Link>,
  },
  {
    date: "2023-12-04",
    description: (
      <>
        <Link href={ createArticleDetailPath("fdjs9rs2bn7ugq9rf8ysa28h") }>ダークテーマ対応してみました。</Link>
        OSのテーマ設定に合わせて自動で切り替わります
      </>
    ),
  },
  {
    date: "2023-08-23",
    description: <Link href={ createArticleDetailPath("qnhckrrtrx8xv662s0ox840y") }>サイト公開</Link>,
  },
];
