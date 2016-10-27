"use strict";

module.exports = {
	options: {
		autoprefixer: {
			browsers: "> 0.5%",
			cascade: false,
			flexbox: "no-2009"
		},
		server: {
			livereload: true,
			open: "http://localhost:8000/dist"
		},
		scss: {
			sourceMapContents: false,
			outputStyle: "compressed"
		}
	},
	paths: {
		clean: {
			src: ["dist/", "!node_modules"]
		},
		processhtml: {
			src: "./src/**/*.html",
			dest: "./dist"
		},
		server: {
			src: "./"
		},
		css: {
			src: "./src/css/**/*.css",
			dest: "./dist/css"
		},
		scss: {
			src: "./src/scss/**/*.scss",
			dest: "./dist/css"
		},
		imagemin: {
			src: "./src/images/*",
			dest: "./dist/images"
		},
		webpack: {
			src: {
				app: ["./src/app/app.js"],
				vendor: ["bonzo", "qwery", "font-awesome/css/font-awesome.css", "normalize-css/normalize.css", "devicons/css/devicons.css"]
			},
			dest: "./dist/js"
		},
		webpackDev: {
			src: {
				app: ["./src/app/app.js"],
				vendor: ["bonzo", "qwery"]
			},
			dest: "./dist/js"
		},
		watch: {
			html: "./src/**/*.html",
			images: "./src/images/*",
			scss: "./src/scss/**/*.scss",
			css: "./src/css/**/*.css"
		}
	},
	names: {
		webpack: "[name].bundle.js"
	}
};
