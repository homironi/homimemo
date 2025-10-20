import { articlesMetaFilePath, getAllArticlesMeta } from "@/lib/_buildtime/article";
import {
  createArticleDetailPath,
  defaultArticleThumbnail,
} from "@/lib/article";
import { siteName, siteOrigin } from "@/lib/utils";
import { Feed } from "feed";
import fs from "fs";

console.log("generating rss...");
generateRss();
console.log("end generate rss");

function generateRss() {
  const feed = new Feed({
    title: siteName,
    link: siteOrigin,
    description: "ほみろにの新着情報",
    id: siteOrigin,
    language: "ja",
    copyright: `© 2023-${new Date().getFullYear().toString()} homi`,
    image: `${siteOrigin}/images/logo.png`,
    docs: "https://cyber.harvard.edu/rss/",
    author: {
      name: "homi",
      link: siteOrigin,
    },
  });

  if (!fs.existsSync(articlesMetaFilePath)) {
    throw new Error(
      `記事MetaのJSONファイルが存在しません: ${articlesMetaFilePath}`
    );
  }

  // 上記の記事のJSONが生成されていることが前提
  getAllArticlesMeta().forEach((article) => {
    const url = `${siteOrigin}${createArticleDetailPath(article.id)}`;
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      guid: article.id,
      date: article.publishDate,
      enclosure: {
        url: `${siteOrigin}${article.thumbnail || defaultArticleThumbnail}`,
      },
    });
  });

  fs.writeFileSync("public/rss.xml", feed.rss2());
}
