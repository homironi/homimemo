import { RssIcon } from "@/assets/icons";
import { XLogo } from "@/assets/logos";
import { GitHubLogo } from "@/assets/logos/GitHub/GitHubLogo";
import Link from "next/link";
import styles from "./Links.module.css";

export type LinksProps = {
  /**
   * アイコンの色
   * テーマに合わせるなら、背景白系の場所は"default"、背景黒系なら"reverse"を指定
   * テーマに関係なく、背景白系なら"black"、背景黒系なら"white"を指定
   */
  color?: "default" | "reverse" | "white" | "black";
};

/**
 *
 * @param root0
 * @param root0.color
 */
export function Links({ color = "default" }: LinksProps) {
  let colorClassName;
  switch (color) {
    case "reverse":
      colorClassName = styles["icon-color-reverse"];
      break;
    case "white":
      colorClassName = styles["icon-color-white"];
      break;
    case "black":
      colorClassName = styles["icon-color-black"];
      break;
    case "default":
    default:
      colorClassName = styles["icon-color"];
      break;
  }

  const iconClassName = `${styles.icon} ${colorClassName}`;
  return (
    <div className={ styles.container }>
      <Link
        href="https://x.com/homironi"
        target="_blank"
        className={ styles.link }
      >
        <XLogo color={ color } className={ styles.icon } />
      </Link>
      <Link
        href="https://github.com/homironi"
        target="_blank"
        className={ styles.link }
      >
        <GitHubLogo color={ color } className={ styles.icon } />
      </Link>
      <Link href="/rss.xml" target="_blank" className={ styles.link }>
        <RssIcon className={ iconClassName } />
      </Link>
    </div>
  );
}
