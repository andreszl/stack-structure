const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./client/src/index.tsx",
    output: {
        filename: "app.js",
        path: __dirname + "/client/public"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        // this handles the bundled .css output file
        new ExtractTextPlugin({
          filename: 'main.css',
        }),
     ],
    module: {
        rules: [
            //tsx loader 
            {test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: "/node_modules/"},
           
            //source-map-loader
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader" }, 
            
            //less loader 
            {use: ExtractTextPlugin.extract({ use: ['css-loader', 'less-loader']}), test: /\.less$/},

             // this rule handles images
             {test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/, use: 'file-loader?name=[name].[ext]?[hash]'},

             // the following 3 rules handle font extraction
             {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
             {test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: 'file-loader'},
             {test: /\.otf(\?.*)?$/,use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'}
        ]
    },
};