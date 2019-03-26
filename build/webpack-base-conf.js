const getEntries = require('../utils/getEntries.js')
const getHtmlConfig = require('../utils/getHtmlConfig.js')
const htmlWebpackPlugin = require('html-webpack-plugin')
const rules = require('./rules.js')
module.exports = {
    entry: getEntries(),
    plugins: [],
    module: {
        rules: [...rules]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10
                },
                utils: {
                    chunks: 'initial',
                    name: 'common',
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
}
const entryObj = getEntries();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
    htmlArray.push({
        _html: element,
        title: '',
        chunks: ['vendor', 'common', element]
    })
})

//自动生成html模板
htmlArray.forEach((element) => {
    module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})