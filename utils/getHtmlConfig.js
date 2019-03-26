 module.exports = function getHtmlConfig(name, chunks) {
     return {
         template: `./src/pages/${name}/index.html`,
         filename: `${name}.html`,
         // favicon: './favicon.ico',
         // title: title,
         inject: true,
         hash: true, //开启hash  ?[hash]
         chunks: chunks,
         minify: process.env.NODE_ENV !== "production" ? false : {
             removeComments: true, //移除HTML中的注释
             collapseWhitespace: true, //折叠空白区域 也就是压缩代码
             removeAttributeQuotes: true, //去除属性引用
         },
     };
 };