var gulp = require('gulp'),
	concat = require('gulp-concat');
gulp.task('default', ['scripts']);
gulp.task('scripts', function () {
	return gulp.src(['client/views/main/js/config.js', 'client/views/main/js/**/*.js', 'client/views/**/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('client/build/js'));
});
