const path = require('path');

module.exports = {
    entry: "./client/src/index.tsx",
    output: {
        filename: "app.js",
        path: __dirname + "/client/public"
    },
    // devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: "/node_modules/"},
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    mode: "development"
};