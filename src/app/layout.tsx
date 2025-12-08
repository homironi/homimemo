import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import {
  articlesListPagePath
} from "@/lib/article";
import {
  createDefaultOG,
  createDefaultTwitter,
  createTitleFromTemplate,
  defaultDescription,
  siteName,
} from "@/lib/utils";
import { NavigationLink } from "@/schemas/navigationLink";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globalElement.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: createTitleFromTemplate("%s"),
    default: siteName,
  },
  description: defaultDescription,
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
  openGraph: createDefaultOG(),
  twitter: createDefaultTwitter(),
};

export const viewport: Viewport = {
  themeColor: "#79cdee",
  colorScheme: "light dark",
};

const links = {
  articles: { href: articlesListPagePath, label: "記事一覧" },
  tags: { href: "/tags/", label: "タグ一覧" },
  about: { href: "/about/", label: "このサイトについて" },
  profile: { href: "/profile/", label: "プロフィール" },
  stats: { href: "/stats/", label: "サイト統計" },
  contact: { href: "/contact/", label: "お問い合わせ" },
  policy: { href: "/privacy-policy/", label: "プライバシーポリシー" },
  disclaimer: { href: "/disclaimer/", label: "免責事項" },
};

const footerLinks: NavigationLink[] = [
  ...Object.values(links),
];

const headerLinks: NavigationLink[] = [
  links.articles,
  links.tags,
  links.about,
  links.profile,
];

/**
 * Rootのレイアウト
 * @param root0 オブジェクト引数
 * @param root0.children レイアウト内に表示する子要素
 * @returns ルートレイアウトのJSX要素
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja">
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7565570537846567"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        <Header />
        <Navigation links={ headerLinks } />
        {children}
        <Footer links={ footerLinks } />
        {process.env.NODE_ENV === "production" && (
          <GoogleTagManager gtmId="G-V6P1VWVXYK" />
        )}
      </body>
    </html>
  );
}
