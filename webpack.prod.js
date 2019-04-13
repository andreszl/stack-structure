const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-root-plugin');
const merge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config,{
   mode:'production',
   output: {
      filename: "app.js",
      path: __dirname + "/build/public"
   },plugins: [
      new HtmlWebpackPlugin({
         title: 'fingit',
      }),new ReactRootPlugin('app'), 
   ],
});