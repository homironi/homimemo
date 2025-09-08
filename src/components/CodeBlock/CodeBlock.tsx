"use client";

import { CheckIcon, ContentCopyIcon } from "@/assets/icons";
import React, { PropsWithChildren, useId, useState } from "react";
import { Button } from "../Button";
import styles from "./CodeBlock.module.css";

const codeLanguageClassNamePattern = /language-(\w+)/;

/**
 *
 * @param root0
 * @param root0.children
 * @param root0.className
 */
export function CodeBlock({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLPreElement>>) {
  const language =
    codeLanguageClassNamePattern.exec(className || "")?.[1] ?? null;

  const codeId = useId();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      let text = "";

      if (typeof children === "string") {
        text = children;
      } else if (React.isValidElement(children)) {
        const codeElement = document.querySelector(
          `[data-code-id="${codeId}"] code`
        );
        text = codeElement?.textContent || "";
      } else if (Array.isArray(children)) {
        text = children
          .map((child) =>
            typeof child === "string" ? child : child?.toString() || ""
          )
          .join("");
      } else {
        text = children?.toString() || "";
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("コピーに失敗しました:", err);
    }
  };

  return (
    <div className={ styles.container }>
      <div className={ styles["tool-container"] }>
        {language && (
          <span className={ styles["language-label"] }>{language}</span>
        )}
        <Button variant="text" onClick={ handleCopy }>
          {copied ? (
            <CheckIcon className={ styles["check-icon"] } />
          ) : (
            <ContentCopyIcon className={ styles.icon } />
          )}
        </Button>
      </div>
      <pre
        { ...props }
        className={ `${styles["code-container"]} ${className || ""}` }
        data-code-id={ codeId }
      >
        {children}
      </pre>
    </div>
  );
}
