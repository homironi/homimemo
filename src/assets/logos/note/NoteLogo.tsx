import Logo from "@/assets/logos/note/icon.svg";
import { SVGProps } from "react";
import styles from "./NoteLogo.module.css";

export type NoteLogoProps = SVGProps<SVGSVGElement> & {
  // 背景白なら"default"、背景黒なら"reverse"を指定
  color?: "default" | "reverse" | "white" | "black";
};

/**
 * NoteロゴのJSX要素
 * @param root0 引数オブジェクト
 * @param root0.color ロゴの色タイプ指定
 * @returns NoteロゴのJSX要素
 */
export function NoteLogo({ color = "default", ...props }: NoteLogoProps) {
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
  return <Logo { ...props } className={ ` ${props.className} ${styles.icon}` } />;
}
