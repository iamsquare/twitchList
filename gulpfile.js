"use strict";

const gulp = require('gulp');
const tasks = require("./gulp/tasks");
const config = require("./gulp/config.js");

gulp.task("cleanDIST", tasks.cleanDist);

gulp.task("minifyIMG", tasks.minifyImage);
gulp.task("minifyCSS", tasks.minifyCss);

gulp.task("copyHTML", tasks.copyHtml);
gulp.task("compileHTML", tasks.compileHtml);
gulp.task("compileSASS", tasks.compileSass);

gulp.task("webpack", tasks.webpack);
gulp.task("webpackdev", tasks.webpackDev);
gulp.task("watch", tasks.watch);

gulp.task("webserver", tasks.webServer);

gulp.task("compile", gulp.parallel(
	"compileSASS", "minifyIMG", "minifyCSS"
));

gulp.task("build", gulp.series(
	"cleanDIST",
	"compile",
	"webpack",
	"compileHTML"
));

gulp.task("dev", gulp.series(
	"cleanDIST",
	"compile",
	"webpackdev",
	"copyHTML",
	gulp.parallel("watch", "webserver")
));
