import { getAllTags } from "@/lib/_buildtime/article";
import { createTagListPagePath } from "@/lib/article";
import fs from "fs";
import path from "path";

type Redirect = {
  from: string;
  to: string;
  statusCode: number;
};

const outputPath = path.join("public", "_redirects");

const manualRedirects: Redirect[] = [
  // 例：{ from: "/old-path", to: "/new-path", statusCode: 301 },
  { from: "/articles/page/1/", to: "/articles/", statusCode: 301 },

  { from: "/categories/memo/0/", to: "/articles/qnhckrrtrx8xv662s0ox840y/", statusCode: 301 },
  { from: "/categories/memo/1/", to: "/articles/63wh6phn350glrerg3fq7u31/", statusCode: 301 },
  { from: "/categories/memo/2/", to: "/articles/myunaxoc7w88tb3shu04jo0k/", statusCode: 301 },

  { from: "/categories/developGame/0/", to: "/articles/y9gwahvcxi4fkbq52ws3a5q6/", statusCode: 301 },
  { from: "/categories/developGame/1/", to: "/articles/7fbf31ehamqsdas2g6gwyr7c/", statusCode: 301 },
  { from: "/categories/developGame/2/", to: "/articles/oxisarp8rwfqng1x7737y2pw/", statusCode: 301 },
  { from: "/categories/developGame/3/", to: "/articles/4m0x8paz57s6xzdv6llba90r/", statusCode: 301 },

  { from: "/categories/developOther/0/", to: "/articles/teuoslm5qrtzhh4lqkqlm34a/", statusCode: 301 },
  { from: "/categories/developOther/1/", to: "/articles/sdky27mklh0qz2c4nput34n1/", statusCode: 301 },
  { from: "/categories/developOther/2/", to: "/articles/t4qf2vp9yl42yilfihryxee7/", statusCode: 301 },
  { from: "/categories/developOther/3/", to: "/articles/6crtf6b55vez6cjwlkmcxmww/", statusCode: 301 },

  { from: "/categories/makeWeb/1/", to: "/articles/iaumv89u70tjyr7c7e0y0gyw/", statusCode: 301 },
  { from: "/categories/makeWeb/2/", to: "/articles/fdjs9rs2bn7ugq9rf8ysa28h/", statusCode: 301 },
  { from: "/categories/makeWeb/3/", to: "/articles/j9vw2byoxq9e0byuo0tgvnb3/", statusCode: 301 },
  { from: "/categories/makeWeb/4/", to: "/articles/9j7rt6wth5xco7mfweqbk4z5/", statusCode: 301 },
  { from: "/categories/makeWeb/5/", to: "/articles/2p1wt6y9byaq875c4kln2yra/", statusCode: 301 },
  { from: "/categories/makeWeb/6/", to: "/articles/gerhmam3hcmi9lbrgs3frm11/", statusCode: 301 },
  { from: "/categories/makeWeb/7/", to: "/articles/6itk153mtrh1rdtek0dacqg8/", statusCode: 301 },
  { from: "/categories/makeWeb/8/", to: "/articles/93n1rqxpt801pqg3cdozcl2s/", statusCode: 301 },
];

const tagArticlesFirstPageRedirects: Redirect[] = getAllTags().map(tag => ({
  from: `/tags/${tag.slug}/page/1/`,
  to: createTagListPagePath(tag),
  statusCode: 301,
}));

const rawRedirects : Redirect[] = [
  ...manualRedirects,
  ...tagArticlesFirstPageRedirects
];

// リダイレクト元のスラッシュありにもなしにもリダイレクト設定を追加
// 基本スラッシュありで設定していますが、リダイレクト元URLがスラッシュなしの場合も対応するため
const nonSlashRedirects: Redirect[] = rawRedirects.map(redirect => {
  if (redirect.from.endsWith("/")) {
    return {
      from: redirect.from.slice(0, -1),
      to: redirect.to,
      statusCode: redirect.statusCode,
    };
  }
  return null;
}).filter((redirect): redirect is Redirect => redirect !== null);
const slashRedirects = rawRedirects.map(redirect => {
  if (!redirect.from.endsWith("/")) {
    return {
      from: `${redirect.from}/`,
      to: redirect.to,
      statusCode: redirect.statusCode,
    };
  }
  return null;
}).filter((redirect): redirect is Redirect => redirect !== null);

const redirects: Redirect[] = [...rawRedirects, ...nonSlashRedirects, ...slashRedirects]
  .sort((a, b) => a.from.localeCompare(b.from));

console.log("Starting to generate redirects...");
console.log("Generated the following redirects:", redirects);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath, 
  redirects.map(redirect => `${redirect.from} ${redirect.to} ${redirect.statusCode}`).join("\n") + "\n"
);

console.log(`End redirects file at ${outputPath}`);