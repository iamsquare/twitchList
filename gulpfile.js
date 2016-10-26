var gulp = require("gulp");
var gutil = require("gulp-util");
var rename = require("gulp-rename");
var pump = require("pump");
var sass = require("gulp-sass");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");
var webpack = require("webpack");

gulp.task("compileSASS", function(cb){
	var src = "scss/*.scss";
	var dest = "css";
	var options = {
		sourceMapContents: false
	};
	pump([
		gulp.src(src),
		sass(options),
		gulp.dest(dest)
		], cb);
});

gulp.task("uglifyCSS", function(cb){
	var src = ["css/*.css", "!css/*.min.css"];
	var dest = "css";
	pump([
		gulp.src(src),
		csso(),
		rename({
			suffix: ".min"
		}),
		gulp.dest(dest)
		], cb);
});

gulp.task("webpack", function(cb){
	var src = "./app/app.js";
	var dest = "app.bundle.js";
	var options = {
		entry: {
			app: src,
			vendor: ["angular"]
		},
		output: {
			path: "js",
			filename: dest
		},
		plugins: [
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
		]
	};
	webpack(options, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log(stats.toString());
		cb();
	});
});

gulp.task("uglifyJS", function(cb){
	var src = ["js/*.js", "!js/*.min.js"];
	var dest = "js";
	pump([
		gulp.src(src),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest(dest)
		], cb);
});


gulp.task("compile", gulp.parallel("webpack"));

gulp.task("uglify", gulp.parallel("uglifyJS", "uglifyCSS"));

gulp.task("default", gulp.series("compile", "uglify"));

gulp.task("watch", function(){
	gulp.watch("app/**/*.js", gulp.series("webpack"));
	gulp.watch("scss/*.scss", gulp.series("compileSASS"));
	gulp.watch(["js/*.js", "!js/*.min.js"], gulp.series("uglifyJS"));
	gulp.watch(["css/*.css", "!css/*.min.css"], gulp.series("uglifyCSS"));
});