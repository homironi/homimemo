import Image from "next/image";
import styles from "./AffiliateLink.module.css";

export type AffiliateLinkProps = {
  name : string;
  imageLink? : string;
  links: {
    amazon? : string;
    rakuten? : string;
    yahoo? : string;
  };
};

/**
 * アフィリエイトリンクComponent
 * @param root0 引数オブジェクト
 * @param root0.name 商品名
 * @param root0.links アフィリエイトリンク
 * @param root0.imageLink 画像リンク
 * @returns アフィリエイトリンクのComponent
 */
export function AffiliateLink({name,imageLink,links}:AffiliateLinkProps){
  const amazonLink = links.amazon?.trim() ?? "";
  const rakutenLink = links.rakuten?.trim() ?? "";
  const yahooLink = links.yahoo?.trim() ?? "";
  return (
    <div className={ styles.container }>
      {imageLink && imageLink.trim() !== "" && 
        <div className={ styles["image-container"] }>
          <div className={ styles["image-container-2"] }>
            <Image src={ imageLink } fill alt={ name } />
          </div>
        </div>
      }
      <div className={ styles.info }>
        <p>{name}</p>
        <div className={ styles.links }>
          {amazonLink !== "" && <a href={ amazonLink } className={ `${styles.amazon} ${styles.link}` }>Amazonで見る</a>}
          {rakutenLink !== "" && <a href={ rakutenLink } className={ `${styles.rakuten} ${styles.link}` }>楽天市場で見る</a>}
          {yahooLink !== "" && <a href={ yahooLink } className={ `${styles.yahoo} ${styles.link}` }>Yahoo!ショッピングで見る</a>}
        </div>
      </div>
    </div>
  );
}
