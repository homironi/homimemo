import styles from "./layout.module.css";

/**
 * stats以下のレイアウト
 * @param root0 オブジェクト引数
 * @param root0.children レイアウト内に表示する子要素
 * @returns ルートレイアウトのJSX要素
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={ styles.container }>
      {children}
    </div>
  );
}
