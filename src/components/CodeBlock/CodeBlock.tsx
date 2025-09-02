import { PropsWithChildren } from "react";

export function CodeBlock({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLPreElement>>) {
  return <pre {...props}>{children}</pre>;
}
