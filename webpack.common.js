const path = require("path");
const pkg = require("./package.json");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/storagy-app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            title: pkg.name,
            description: pkg.description,
            template: "./index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    }
};
