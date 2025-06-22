import { NavigationLink } from "@/schemas/navigationLink";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export type FooterProps = {
  links: NavigationLink[];
};

/**
 * フッター
 * @param root0
 * @param root0.links
 * @returns フッターコンポーネントのJSX要素
 */
export function Footer({ links }: FooterProps) {
  const nowYear = new Date().getFullYear();
  return (
    <footer className={ styles.container }>
      <nav>
        <ul className={ styles.navigation }>
          {links.map(link => (
            <li
              key={ link.href }
              className={ styles["navigation-item"] }
            >
              <Link
                href={ link.href }
                className={ styles["navigation-link"] }
              >
                { link.label }
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
      {/* TODO: 外部アカウントリンク */}
      <div className={ styles["logo-container"] }>
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={ 256 }
            height={ 64 }
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
    </footer>
  );
}
