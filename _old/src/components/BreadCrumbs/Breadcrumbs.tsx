import { JsonLd } from "@/components/JsonLd";
import { siteOrigin } from "@/lib/utils";
import Link from "next/link";
import { BreadcrumbList, WithContext } from "schema-dts";
import styles from "./Breadcrumbs.module.css";

export type BreadcrumbElement = {
  name: string;
  href: string;
  isCurrent?: boolean;
};

export type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbElement[];
};

/**
 * パンくずリスト
 * @param root0 引数オブジェクト
 * @param root0.breadcrumbs パンくずデータ
 * @returns パンくずリスト要素
 * @description HomeはComponent内で追加される
 */
export function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  const items: BreadcrumbElement[] = [
    {
      name: "ホーム",
      href: "/",
    },
    ...breadcrumbs,
  ];

  return (
    <>
      <nav>
        <ol className={ styles.list }>
          {items.map((item) => {
            const className = `${styles.li}`;
            return (
              <li key={ item.href } className={ className }>
                <Link href={ item.href }>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd schema={ createJsonLd(items) } />
    </>
  );
}

function createJsonLd(items:BreadcrumbElement[]): WithContext<BreadcrumbList>{
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({name, href}, index)=>{
      return {
        "@type": "ListItem",
        name,
        item: `${siteOrigin}${href}`,
        position: index + 1,
      };
    })
  };
}
