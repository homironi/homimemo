import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${styles.button} ${props.className}`}>
      {children}
    </button>
  );
}
