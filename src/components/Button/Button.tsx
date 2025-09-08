import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export type ButtonVariants = "outlined" | "filled" | "text";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
};

const buttonVariantClassName: { [key in ButtonVariants]: string } = {
  outlined: styles.outlined,
  filled: styles.filled,
  text: styles.text,
};

/**
 * ボタンコンポーネント
 * @param root0 引数オブジェクト
 * @param root0.children ボタンの子要素
 * @param root0.variant ボタンのスタイル variant
 * @returns ボタンのJSX要素
 */
export function Button({ children, variant, ...props }: ButtonProps) {
  return (
    <button
      { ...props }
      className={ `${styles.button} ${
        buttonVariantClassName[variant || "filled"]
      } ${props.className}` }
    >
      {children}
    </button>
  );
}
