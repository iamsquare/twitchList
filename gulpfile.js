var gulp = require("gulp");
var gutil = require("gulp-util");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");
var webpack = require("webpack");
var pump = require("pump");

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
	var options = {
		entry: {
			app: './app/app.js',
			vendor: ['angular']
		},output: {
			path: "js",
			filename: "app.bundle.js"
		},
		plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
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

gulp.task("compile", gulp.parallel("webpack", "compileSASS"));

gulp.task("uglify", gulp.parallel("uglifyJS", "uglifyCSS"));

gulp.task("default", gulp.series("compile", "uglify"));

gulp.task("watch", function(){
	gulp.watch("app/**/*.js", gulp.series("webpack"));
	gulp.watch("scss/*.scss", gulp.series("compileSASS"));
	gulp.watch(["js/*.js", "!js/*.min.js"], gulp.series("uglifyJS"));
	gulp.watch(["css/*.css", "!css/*.min.css"], gulp.series("uglifyCSS"));
});