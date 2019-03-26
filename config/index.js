const path = require('path')
module.exports = {
    dev: {
        host: 'localhost',
        port: 9014,
        autoOpenBrowser: true,
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        proxyTable: {}
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }

}