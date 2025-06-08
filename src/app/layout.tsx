import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Metadata, Viewport } from "next";
import { Kosugi_Maru } from "next/font/google";
import "./globalElement.css";
import "./globals.css";

const kosugiMaru = Kosugi_Maru({
  variable: "--font-kosugi-maru",
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const siteName = "ほみろに";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: "ゲームやお絵かきなどいろんなことを書く、ほみの個人サイトです。",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: "homironi",
  authors: { name: "homi" },
  publisher: "homi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#79cdee",
  colorScheme: "light dark",
};

/**
 * Rootのレイアウト
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
    <html lang="ja">
      <body className={ `${kosugiMaru.className} ${kosugiMaru.variable}` }>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
