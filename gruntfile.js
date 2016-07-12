module.exports=function(grunt){
	grunt.initConfig({

		uglify: {
			js: {
				files: [{
					expand: true,
					cwd: "js",
					src: ["*.js", "!*.min.js"],
					dest: "js",
					ext: ".min.js"
				}]
			}
		},

		sass: {
			dist: {
				options: {
					style: "compressed",
					sourcemap: "none",
					noCache: true
				},
				files: [{
					expand: true,
					cwd: "scss",
					src: ["*.scss", "*.sass"],
					dest: "css",
					ext: ".min.css"
				}]
			}
		},

		watch: {
			scss: {
				files: "scss/*.scss",
				tasks: ["sass"],
			},
			sass: {
				files: "sass/*.sass",
				tasks: ["sass"],
			},
			scripts: {
				files: "js/*.js",
				tasks: ["uglify"]
			}
		},

	});

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.registerTask("default", ["uglify","sass"]);
};
