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
 *
 * @param root0
 * @param root0.children
 * @param root0.variant
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
