import X from "@/assets/logos/x/logo.svg";
import styles from "@/assets/logos/x/XLogo.module.css";
import { SVGProps } from "react";

export function XLogo(props: SVGProps<SVGSVGElement>) {
  return <X {...props} className={`${styles.icon} ${props.className}`} />;
}
