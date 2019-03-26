if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development"
}
const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('../config')
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const webpackConfig = require('../build/webpack-dev-conf.js')
const port = config.dev.port
const app = express()
const compiler = webpack(webpackConfig)
const opn = require('opn')
const proxyTable = config.dev.proxyTable
const proxyMiddleware = require('http-proxy-middleware')
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
})
app.use(devMiddleware)
app.use(hotMiddleware)
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + config.dev.host + ':' + config.dev.port + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(config.dev.host + ':' + config.dev.port)
    }
    _resolve()
})
app.listen(port)