import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

/**
 * フッター
 * @returns フッターコンポーネントのJSX要素
 */
export function Footer() {
  const nowYear = new Date().getFullYear();
  return (
    <footer>
      {/* TODO: Footer 用 ナビゲーション */}
      {/* TODO: 外部アカウントリンク */}
      <div className={ styles.container }>
        <div className={ styles["logo-container"] }>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              fill
              className={ styles.logo }
            />
          </Link>
        </div>
        <p
          className={ styles["copy-light"] }
          translate="no"
        >
          © 2023-
          {nowYear.toString()}
          {" "}
          homironi
        </p>
      </div>
    </footer>
  );
}
