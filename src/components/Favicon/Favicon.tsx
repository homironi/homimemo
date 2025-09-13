import { siteOrigin } from "@/lib/utils";
import Image from "next/image";
import styles from "./Favicon.module.css";

export type FaviconProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  href? : string;
  alt: string;
};

/**
 * 任意のhrefのfaviconを表示する
 * @param root0 引数オブジェクト
 * @param root0.href リンクなどのURL
 * @param root0.alt favicon画像のaltテキスト
 * @param root0.className CSSクラス名
 * @returns hrefのfavicon
 */
export function Favicon({ href, alt, className, ...props } : FaviconProps){
  if(href && href.trim() !== ""){
    const faviconOrigin = /https?:\/\//.test(href) ? new URL(href).origin : siteOrigin; 
    return (
      <Image 
        { ...props }
        src={ `https://www.google.com/s2/favicons?domain=${faviconOrigin}` }
        alt={ alt }
        width={ 16 }
        height={ 16 }
        className={ `${styles.favicon} ${className}` }
      />);
  }

  return null;
}
