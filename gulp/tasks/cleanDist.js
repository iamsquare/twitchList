"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var clean = require("gulp-clean");
var config = require("../config");

module.exports = function(callback){
	return gulp.src(config.paths.clean.src, { read: false }).on("error", function(){
		gutil.log("[Clean]", gutil.colors.green("Folder ") + gutil.colors.cyan(config.paths.clean.src[0]) + gutil.colors.green(" doesn't exists. Moving on..."))
		callback();
	})
	.pipe(clean({ force: true }));
}
