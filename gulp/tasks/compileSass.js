"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var config = require("../config");

module.exports = function(callback){
	gulp.src(config.paths.scss.src)
	.pipe(sass(config.options.scss)).on("error", function(e){
		gutil.log(gutil.colors.red(e.message));
	})
	.pipe(autoprefixer(config.options.autoprefixer))
	.pipe(gulp.dest(config.paths.scss.dest));
	callback();
};
