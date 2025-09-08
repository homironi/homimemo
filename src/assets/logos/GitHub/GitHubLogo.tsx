import GitHub from "@/assets/logos/GitHub/github-mark.svg";
import styles from "@/assets/logos/GitHub/GitHubLogo.module.css";
import { SVGProps } from "react";

export type GitHubLogoProps = SVGProps<SVGSVGElement> & {
  // 背景白なら"default"、背景黒なら"reverse"を指定
  color?: "default" | "reverse" | "white" | "black";
};

/**
 *
 * @param root0
 * @param root0.color
 */
export function GitHubLogo({ color = "default", ...props }: GitHubLogoProps) {
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
  return <GitHub { ...props } className={ ` ${props.className} ${styles.icon}` } />;
}
