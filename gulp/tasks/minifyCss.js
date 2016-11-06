"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var csso = require("gulp-csso");
var autoprefixer = require("gulp-autoprefixer");
var config = require("../config");

module.exports = function(callback){
	gulp.src(config.paths.css.src)
	.pipe(autoprefixer(config.options.autoprefixer))
	.pipe(csso()).on("error", function(e){
		gutil.log(gutil.colors.red(e.message));
	})
	.pipe(gulp.dest(config.paths.css.dest));
	callback();
};
