// 最終編集日、ないものは日付降順でソートする
function sortByDateFromPageData(left, right) {
    // 最終編集日、ないものは日付を取得するローカル関数
    function CreatePostDate(post) {
        return new Date(post.lastEditDate ? post.lastEditDate : post.date);
    }

    return CreatePostDate(right) - CreatePostDate(left);
}

// マークダウン
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

// 目次
const pluginTOC = require("eleventy-plugin-toc");

// ナビゲーション+パンくずリスト
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// 単独行URLを自動で埋め込み表示してくれる
const embedEverything = require("eleventy-plugin-embed-everything");

// directory-output
// https://www.11ty.dev/docs/plugins/directory-output/
// https://www.npmjs.com/package/@11ty/eleventy-plugin-directory-output
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");

module.exports = function (eleventyConfig) {
    // ----eleventyの設定変更----
    // Eleventyのポート番号を変更する
    eleventyConfig.setServerOptions({
        port: 49100, // 8080はかぶるので新しいポート番号に変更
    });

    // ----addFilter----
    // 記事の日付のフィルター：
    eleventyConfig.addFilter("dateFormat", function (value) {
        const Year = value.getFullYear();
        const Month = (parseInt(value.getMonth()) + 1)
            .toString()
            .padStart(2, "0");
        const Date = value.getDate().toString().padStart(2, "0");
        return `${Year}-${Month}-${Date}`;
    });
    // 記事の日付のフィルター：記事内での表示
    eleventyConfig.addFilter("dateFormatJapanese", function (value) {
        let date = value.split("-");
        const Year = date[0];
        const Month = date[1];
        const Date = date[2];
        return `${Year}年${Month}月${Date}日`;
    });

    eleventyConfig.addFilter("filterByCategory", function (posts, category) {
        return posts.filter((post) => post.data.category == category);
    });

    eleventyConfig.addFilter("slice", function (posts, start, end) {
        if (
            !Array.isArray(posts) ||
            typeof start !== "number" ||
            typeof end !== "number"
        ) {
            throw new Error(
                "Invalid input for arraySliceFilter. Expected an array, start index, and end index."
            );
        }

        // Perform array slicing
        return posts.slice(start, end);
    });

    eleventyConfig.addFilter("markdownWithClasses", function (content) {
        const md = markdownIt({ html: true }).use(markdownItAttrs);

        return md.render(content);
    });

    // タグリスト
    eleventyConfig.addFilter("getAllTags", (collection) => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });

    // 最終編集日を考慮して、新しい順に並び替えた記事リストを返すフィルター
    eleventyConfig.addFilter("sortByDateFromPageData", function (posts) {
        if (!Array.isArray(posts)) {
            throw new Error(
                "Invalid input for array `sortByDateFromPageData`. Expected array."
            );
        }

        return posts.sort((l, r) => sortByDateFromPageData(l.data, r.data));
    });

    // ----addCollection----
    // https://www.11ty.dev/docs/collections/
    // inputPath（_src/） を含めて検索（変更しているせいもある？）

    // 全記事コレクション
    eleventyConfig.addCollection("articles", function (collectionApi) {
        return collectionApi.getFilteredByGlob(
            "_src/categories/**/*[0-9]/*.md"
        );
    });

    // カテゴリ一覧ページコレクション
    eleventyConfig.addCollection("categories", function (collectionApi) {
        return collectionApi.getFilteredByGlob("_src/categories/*/index.md");
    });

    // タグ一覧ページコレクション
    eleventyConfig.addCollection("tags", function (collectionApi) {
        return collectionApi.getFilteredByGlob("_src/tags/*/index.md");
    });

    // ----setLibrary----
    // Markdown
    eleventyConfig.setLibrary(
        "md",
        markdownIt()
            // Markdownにidを設定してくれる
            .use(markdownItAnchor)
            // Markdownにクラスなどを設定できるように
            .use(markdownItAttrs, {
                // optional, these are default options
                leftDelimiter: "{",
                rightDelimiter: "}",
                allowedAttributes: [], // empty array = all attributes are allowed
            })
            // div をマークダウンでかけるように `:::` でコードブロックのように囲む
            .use(require("markdown-it-div"))
    );

    // ----addPlugin----
    // 目次
    eleventyConfig.addPlugin(pluginTOC, {
        tags: ["h2", "h3"],
        wrapper: "div",
    });

    // ナビゲーション+パンくずリスト
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    // 単独行URLを自動で埋め込み表示してくれる
    eleventyConfig.addPlugin(embedEverything);

    // ビルド時のディレクトリの詳細出力
    eleventyConfig.setQuietMode(false);
    eleventyConfig.addPlugin(directoryOutputPlugin, {
        // Customize columns
        columns: {
            filesize: true, // Use `false` to disable
            benchmark: true, // Use `false` to disable
        },
    });

    // ----addPassthroughCopy----
    // 画像フォルダのコピー
    eleventyConfig.addPassthroughCopy("_src/images");

    // cssフォルダのコピー
    eleventyConfig.addPassthroughCopy("_src/styles");
    eleventyConfig.addPassthroughCopy("_src/images");

    // スクリプトフォルダのコピー
    eleventyConfig.addPassthroughCopy("_src/scripts");

    // robots.txtのコピー
    eleventyConfig.addPassthroughCopy("_src/robots.txt");

    // サーバー関連ファイルのコピー
    eleventyConfig.addPassthroughCopy("_src/.htaccess");
    eleventyConfig.addPassthroughCopy("_src/.user.ini");

    return {
        // Control which files Eleventy will process
        templateFormats: ["md", "njk", "html", "liquid", "xml"],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",

        // 構成オプション
        // https://www.11ty.dev/docs/config/#configuration-options
        dir: {
            input: "_src", // default: "."
            output: "_public", // default: "_site"
            layouts: "_layouts",
        },
    };
};
