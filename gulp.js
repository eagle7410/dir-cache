/**
 * Created by igor on 05.10.16.
 */
//const gulp = require('gulp');
//const babel = require('gulp-babel');
//const grab = require('ps-grab');
//gulp.task('default', () => {
//	return gulp.src(grab('--in'))
//		.pipe(babel({
//			presets: ['es2015']
//		}))
//		.pipe(gulp.dest(grab('--out')));
//});
require('minify')('./lib/dir-cache.js', function(error, data) {
	if (error)
		console.error(error.message);
	else
		console.log(data);
});
