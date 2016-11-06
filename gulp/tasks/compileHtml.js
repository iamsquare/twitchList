"use strict";

var gulp = require("gulp");
var processhtml = require("gulp-processhtml")
var config = require("../config");

module.exports = function(callback){
	gulp.src(config.paths.processhtml.src)
	.pipe(processhtml())
	.pipe(gulp.dest(config.paths.processhtml.dest));
	callback();
};
