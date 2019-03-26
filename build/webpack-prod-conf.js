const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpackConfigBase = require('./webpack-base-conf');

const webpackConfigProd = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash].js'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new cleanWebpackPlugin({
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false,
        }),
        new extractTextPlugin({
            filename: 'css/[name].[hash:8].min.css',
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: false,
                    drop_console: true
                }
            }
        })
    ]

}
module.exports = merge(webpackConfigBase, webpackConfigProd);