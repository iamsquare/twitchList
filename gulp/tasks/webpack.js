"use strict";

var gutil = require("gulp-util");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require("../config");

module.exports = function(callback){
	var options = {
		entry: config.paths.webpack.src,
		output: {
			path: config.paths.webpack.dest,
			filename: config.names.webpack
		},
		plugins: [
			new ExtractTextPlugin("../css/[name].css"),
			new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false,
				output: { comments : false }
			})
		],
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader")
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)(\?[a-z0-9=&.]+)?$/,
					loader: "file-loader?name=../fonts/[name].[ext]"
				}
			]
		}
	}

	webpack(options, function(err, stats){
		gutil.log("[Webpack]", stats.toString({
			colors: true
		}));
		callback();
	});
};
