const extractTextPlugin = require("extract-text-webpack-plugin");
const rules = [{
        test: /\.(css|scss|sass)$/,
        use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader", "postcss-loader"] : extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader", "postcss-loader"],
            publicPath: "../"

        })
    },
    {
        test: /\.js$/,
        use: ["babel-loader"],
    }, {
        test: /\.(png|jpg|gif)$/,
        use: [{

            loader: "url-loader",
            options: {
                limit: 5 * 1024,
                outputPath: "images"
            }
        }]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
        }
    },
    {
        test: /\.html$/,
        use: ["html-withimg-loader"]
    }, {
        test: /\.less$/,
        use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "less-loader"] : extractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "less-loader"],
            publicPath: "../"
        })
    }
];
module.exports = rules;