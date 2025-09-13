import { Links } from "@/components/Links";
import Image from "next/image";
import styles from "./Profile.module.css";

const profileLink="/profile/";

/**
 * 運営者プロフィールコンポーネント
 * @returns 運営者プロフィールの要素
 */
export function Profile() {
  return (
    <div className={ styles.container }>
      <h2>運営者</h2>
      <p><a href={ profileLink }>ほみ</a></p>
      <a href={ profileLink }>
        <Image
          src="/images/profile.webp"
          alt="ほみのプロフィール画像"
          width={ 128 }
          height={ 128 }
          className={ styles.image }
        />
      </a>
      <p>
        プログラミングとか
        <br />
        おえかきとか
        <br />
        いろいろするのがすき
      </p>
      <Links />
    </div>
  );
}
