import X from "@/assets/logos/x/logo.svg";
import styles from "@/assets/logos/x/XLogo.module.css";
import { SVGProps } from "react";

export type XLogoProps = SVGProps<SVGSVGElement> & {
  color?: "default" | "reverse" | "white" | "black";
};

/**
 * XロゴのJSX要素
 * @param root0 引数オブジェクト
 * @param root0.color ロゴの色タイプ指定
 * @returns XロゴのJSX要素
 */
export function XLogo({ color = "default", ...props }: XLogoProps) {
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

  props.className = `${props.className ?? ""} ${colorClassName}`;
  return <X { ...props } className={ ` ${props.className} ${styles.icon}` } />;
}
