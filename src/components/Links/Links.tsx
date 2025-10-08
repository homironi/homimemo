import { CodeIcon, RssIcon } from "@/assets/icons";
import { GitHubLogo, NoteLogo, XLogo } from "@/assets/logos";
import Image from "next/image";
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
 * SNSリンク集
 * @param root0 引数オブジェクト
 * @param root0.color アイコンの色タイプ
 * @returns リンク集のコンポーネント
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
        title="ほみのXアカウント"
      >
        <XLogo color={ color } className={ styles.icon } />
      </Link>
      <Link
        href="https://github.com/homironi"
        target="_blank"
        className={ styles.link }
        title="ほみのGitHubアカウント"
      >
        <GitHubLogo color={ color } className={ styles.icon } />
      </Link>
      <Link
        href="https://note.com/homironi"
        target="_blank"
        className={ styles.link }
        title="ほみのnoteアカウント"
      >
        <NoteLogo color={ color } className={ styles.note } />
      </Link>
      <Link
        href="/rss.xml"
        target="_blank"
        className={ styles.link }
        title="当サイト記事のrss.xml"
        >
        <RssIcon className={ iconClassName } />
      </Link>
      <Link
        href="https://github.com/homironi/homimemo"
        target="_blank"
        className={ styles.link }
        title="当サイトのリポジトリ"
        >
        <CodeIcon className={ iconClassName } />
      </Link>
      <Link
        href="https://ko-fi.com/homironi"
        target="_blank"
        className={ styles.link }
        title="Ko-fiというサイトを通じて運営者にココアを買えます"
        >
          <div className={ styles["image-container"] }>
            <div className={ styles["image-container-2"] }>
              <Image alt="Ko-fiのロゴ" src="/images/logos/ko-fi/kofi_symbol.svg" fill />
            </div>
        </div>
      </Link>
    </div>
  );
}
