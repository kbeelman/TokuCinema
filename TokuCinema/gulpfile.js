var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
    gulp.src('src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css/'))
});

gulp.task('compile-theme', function() {
    gulp.run(['styles']);
});

//Watch task
gulp.task('default', function() {
    gulp.watch('src/**/*.scss', ['styles']);
});