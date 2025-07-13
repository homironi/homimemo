import Image from "next/image";
import styles from "./Profile.module.css";

/**
 * 運営者プロフィールコンポーネント
 * @returns 運営者プロフィールの要素
 */
export function Profile() {
  return (
    <div className={ styles.container }>
      <h2>運営者</h2>
      <p>ほみ</p>
      <Image
        src="/images/piyo.png"
        alt="ほみのプロフィール画像"
        width={ 128 }
        height={ 128 }
        className={ styles.image }
      />
      <p>
        プログラミングとか
        <br />
        おえかきとか
        <br />
        いろいろするのがすき
      </p>
    </div>
  );
}
