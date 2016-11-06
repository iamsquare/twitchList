"use strict";
var gulp = require("gulp");
var gutil = require("gulp-util");
var webserver = require("gulp-webserver");
var config = require("../config");

module.exports = function(callback){
	gulp.src(config.paths.server.src)
	.pipe(webserver(config.options.server)).on("error", function(e){
		gutil.log(gutil.colors.red(e.message));
	});
	callback();
};
