"use strict";

var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var config = require("../config");

module.exports = function(callback){
	return gulp.src(config.paths.imagemin.src)
	.pipe(imagemin())
	.pipe(gulp.dest(config.paths.imagemin.dest));
};
