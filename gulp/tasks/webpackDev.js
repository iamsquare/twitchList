"use strict";

var gutil = require("gulp-util");
var webpack = require("webpack");
var config = require("../config");

module.exports = function(callback){
	var options = {
		entry: config.paths.webpackDev.src,
		output: {
			path: config.paths.webpackDev.dest,
			filename: config.names.webpack
		},
		watch: true,
		cache: true,
		plugins: [
			new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
		]
	};

	webpack(options, function(err, stats){
		gutil.log("[WebpackDev]", stats.toString({
			colors: true
		}));
		callback();
	});
};
