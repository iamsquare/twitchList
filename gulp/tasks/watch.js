"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var config = require("../config");

module.exports = function(){
	gulp.watch(config.paths.watch.html, gulp.parallel("copyHTML"));
	gulp.watch(config.paths.watch.scss, gulp.parallel("compileSASS"));
	gulp.watch(config.paths.watch.images, gulp.parallel("minifyIMG"));
	gulp.watch(config.paths.watch.css, gulp.parallel("minifyCSS"));
	gutil.log(gutil.colors.yellow("[Watch]"), "Watching files...");
};
