const glob = require('glob')
module.exports = function getEntry() {
    var entry = {};
    //读取src目录所有page入口
    glob.sync('./src/pages/**/*.js')
        .forEach(function (name) {

            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口 
            n = n.split('/')[1];
            eArr.push(name);
            entry[n] = eArr;
        });
    return entry;
};