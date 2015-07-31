var gulp = require('gulp'),
    jade = require('gulp-jade'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps');

var output = './build/' + process.env.NODE_ENV;

//Default task
gulp.task('default', function(callback) {
    runSequence('build', callback);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'copy-build', callback);
});

gulp.task('clean', function(callback) {
    del(['./build'], {force: true}, callback);
});

gulp.task('copy-build', ['jade', 'js', 'stylus']);

gulp.task('jade', function() {
    return gulp.src('./public/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(output))
});

gulp.task('js', function() {
    return gulp.src('./server.js')
        .pipe(browserify({debug: gutil.env.development}))
        .pipe(gutil.env.production ? uglify() : gutil.noop())
        .pipe(gulp.dest(output + '/js'));
});

gulp.task('stylus', function() {
    return gulp.src('./public/css/*.stylus')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true,
            linenos: true,
            'include css': true
        }))
        .pipe(sourcemaps.write())
        .pipe(gutil.env.production ? uglify() : gutil.noop())
        .pipe(gulp.dest(output + '/css'));
});