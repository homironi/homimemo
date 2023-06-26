// マークダウン
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

// 目次（パンくずも）
const pluginTOC = require('eleventy-plugin-toc')

module.exports = eleventyConfig => {
    // Markdown
    eleventyConfig.setLibrary
        (
            'md',
            markdownIt().use(markdownItAnchor)
        )

    // 目次
    eleventyConfig.addPlugin(pluginTOC,
        {
            tags: ['h2', 'h3'],
            wrapper: 'div'
        })
}