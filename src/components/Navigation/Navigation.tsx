import Link from "next/link";
import styles from "./Navigation.module.css";

export type NavigationLink = {
  href: string;
  label: string;
};

export type NavigationProps = {
  links: NavigationLink[];
};

/**
 * ナビゲーション
 * @param root0 引数オブジェクト
 * @param root0.links ナビゲーションリンクの配列
 * @returns ナビゲーションのJSX要素
 */
export function Navigation({ links }: NavigationProps) {
  return (
    <nav className={ styles.container }>
      <ul className={ styles.list }>
        {links.map(link => (
          <li
            key={ `${link.href}-${link.label}` }
            className={ styles.item }
          >
            <Link
              href={ link.href }
              className={ styles.link }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
