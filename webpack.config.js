const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-root-plugin');


module.exports = {
	mode: 'development',
	watchOptions: {
		ignored: /node_modules/,
	},
	entry: './client/src/index.tsx',
	output: {
		filename: 'app.js',
		path: `${__dirname}/client/public`,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'app.css',
		}),
		new HtmlWebpackPlugin({
			title: 'development',
		}),
		new ReactRootPlugin('app'),
	],
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: '/node_modules/' },
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{ use: ExtractTextPlugin.extract({ use: ['css-loader', 'less-loader'] }), test: /\.less$/ },
			{ test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/, use: 'file-loader?name=[name].[ext]?[hash]' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
			{ test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
			{ test: /\.otf(\?.*)?$/, use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf' },
		],
	},
};
