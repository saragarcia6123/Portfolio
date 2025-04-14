module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("res");
    eleventyConfig.addPassthroughCopy("res/bundle.css");
    eleventyConfig.addPassthroughCopy("src/script.js");

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    };
}