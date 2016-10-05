/**
 * Created by igor on 26.07.16.
 */
module.exports = function(grunt) {

	grunt.initConfig({
		jsdoc2md: {
			oneOutputFile: {
				src: 'lib/*.js',
				dest: 'Readme.md'
			}
		},
		uglify : {
			options: {
				quoteStyle : 3
			},
			js : {
				files: {
					'lib/prod/dir-cache.js': ['lib/dir-cache.js']
				}
			}
		}
		//babel: {
		//	options: {
		//		"sourceMap": true,
		//		"experimental": true,
		//		"plugins": ["transform-es2015-modules-amd"]
		//	},
		//	dist: {
		//		files: {
		//			'./lib/prod/dir-cache.js': './lib/dir-cache.js'
		//		}
		//	}
		//},
		//browserify: {
		//	dist: {
		//		options: {
		//			transform: [["babelify", { "stage": 0 }]]
		//		},
		//		files: {
		//			"./lib/prod/dir-cache.js": "./lib/dir-cache.js"
		//		}
		//	}
		//}
	});
	grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks("grunt-browserify");
	grunt.registerTask('default', ['uglify', 'jsdoc2md']);
};
