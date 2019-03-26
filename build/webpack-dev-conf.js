const path = require('path')
const baseWebpackConfig = require('./webpack-base-conf.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const friendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new friendlyErrorsPlugin()
    ]
})