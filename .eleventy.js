// マークダウン
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

// 目次
const pluginTOC = require('eleventy-plugin-toc');

// ナビゲーション+パンくずリスト
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {

    // 記事の日付のフィルター：
    eleventyConfig.addFilter("dateFormat", function (value) {
        const Year = value.getFullYear();
        const Month = (parseInt(value.getMonth()) + 1).toString().padStart(2, "0");
        const Date = value.getDate().toString().padStart(2, "0");
        return `${Year}-${Month}-${Date}`;
    });
    // 記事の日付のフィルター：記事内での表示
    eleventyConfig.addFilter("dateFormatJapanese", function (value) {
        let date = value.split('-');
        const Year = date[0];
        const Month = date[1];
        const Date = date[2];
        return `${Year}年${Month}月${Date}日`;
    });

    // Markdown
    eleventyConfig.setLibrary
        (
            'md',
            markdownIt().use(markdownItAnchor)
        );

    // 目次
    eleventyConfig.addPlugin(pluginTOC,
        {
            tags: ['h2', 'h3'],
            wrapper: 'div'
        });

    // ナビゲーション+パンくずリスト
    eleventyConfig.addPlugin(eleventyNavigationPlugin);


    // ファビコンのコピー
    eleventyConfig.addPassthroughCopy("_src/favicon.ico");

    // 画像フォルダのコピー
    eleventyConfig.addPassthroughCopy("_src/images");

    // cssフォルダのコピー
    eleventyConfig.addPassthroughCopy("_src/styles");

    return {
        // Control which files Eleventy will process
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid",
            'xml'
        ],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",

        // 構成オプション
        // https://www.11ty.dev/docs/config/#configuration-options
        dir: {
            input: "_src",          // default: "."
            output: "_public",      // default: "_site"
            layouts: "_layouts"
        },
    }
};