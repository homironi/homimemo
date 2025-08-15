import { XLogo } from "@/assets/logos";
import { GitHubLogo } from "@/assets/logos/GitHub/GitHubLogo";
import Image from "next/image";
import Link from "next/link";
import styles from "./Profile.module.css";

/**
 * 運営者プロフィールコンポーネント
 * @returns 運営者プロフィールの要素
 */
export function Profile() {
  return (
    <div className={styles.container}>
      <h2>運営者</h2>
      <p>ほみ</p>
      <Image
        src="/images/profile.webp"
        alt="ほみのプロフィール画像"
        width={128}
        height={128}
        className={styles.image}
      />
      <p>
        プログラミングとか
        <br />
        おえかきとか
        <br />
        いろいろするのがすき
      </p>
      <div>
        <Link href="https://x.com/homironi" target="_blank">
          <XLogo />
        </Link>
        <Link href="https://github.com/homironi" target="_blank">
          <GitHubLogo />
        </Link>
      </div>
    </div>
  );
}
