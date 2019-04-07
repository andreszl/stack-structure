const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-root-plugin');

module.exports = {
    mode: "development",
    entry: "./client/src/index.tsx",
    plugins: [
        new HtmlWebpackPlugin({
           title: 'fingit',
        }),new ReactRootPlugin('app')
     ],
    output: {
        filename: "app.js",
        path: __dirname + "/client/public"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: "/node_modules/"},
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};