import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

/**
 * ヘッダーコンポーネント
 * @returns ヘッダーコンポーネントのJSX要素
 */
export function Header() {
  return (
    <header className={ styles.container }>
      <div className={ styles["logo-container"] }>
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={ 256 }
            height={ 64 }
            priority
          />
        </Link>
      </div>
    </header>
  );
}
