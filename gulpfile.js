var gulp = require('gulp'),
    jade = require('gulp-jade'),                    // compile jade to html
    del = require('del'),                           // clean the file before build
    runSequence = require('run-sequence'),          // run task one by one
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),                   // util tools
    stylus = require('gulp-stylus'),                // compile stylus to css
    sourcemaps = require('gulp-sourcemaps'),        // sourcemaps for stylus
    connect = require('gulp-connect'),              // live reload
    imagemin = require('gulp-imagemin'),            // compress images
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),              // keep gulp watching without stopping when error happen
    autoprefixer = require('gulp-autoprefixer'),    // auto add web prefix for you
    ngAnnotate = require('gulp-ng-annotate');

//Default task
gulp.task('default', function(callback) {
    runSequence('build', ['watch'], callback);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'copy-build', callback); //run clean first, then copy-build
});

gulp.task('clean', function(callback) {
    del(['./build'], {force: true}, callback);
});

gulp.task('copy-build', ['jade', 'js', 'languages', 'stylus', 'css', 'vendor', 'image']);

/* jade tasks*/
gulp.task('jade', function() {
    runSequence('jade-public', 'jade-server');
});

gulp.task('jade-public', function() {
    return gulp.src('./public/**/*.jade')
        .pipe(plumber())
        .pipe(gulp.dest('./build/public'));
});

gulp.task('jade-server', function() {
    return gulp.src('./server/**/*.jade')
        .pipe(plumber())
        .pipe(gulp.dest('./build/server'));
});
/* jade task end*/

/*
gulp.task('js-server', function() {
    return gulp.src('./server.js')
        .pipe(plumber())
        .pipe(browserify({debug: gutil.env.development}))
        .pipe(gutil.env.production ? uglify() : gutil.noop())
        .pipe(gulp.dest('./build/development'));
});*/



/* js task */
gulp.task('js', ['js-public', 'js-server', 'js1']);

gulp.task('js1', function() {
    return gulp.src('./server.js')
        .pipe(gulp.dest('./build'));
});

gulp.task('js-public', function() {
    return gulp.src('./public/app/**/*.js')
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./build/public/app'));
});

gulp.task('js-server', function() {
    return gulp.src('./server/**/*.js')
        .pipe(gulp.dest('./build/server'));
});
/* js task end*/

gulp.task('languages', function() {
    return gulp.src('./server/i18n/*.json')
        .pipe(gulp.dest('./build/server/i18n'));
});

gulp.task('css', function(){
    return gulp.src('./public/css/*.css')
        .pipe(gulp.dest('./build/public/css'));
});

gulp.task('stylus', function() {
    return gulp.src('./public/css/*.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: false  /*,
             linenos: true,
             'include css': true*/
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/public/css'));
});

gulp.task('vendor', function() {
    gulp.src('./public/vendor/**/*.js')
        .pipe(gulp.dest('./build/public/vendor'));
});

gulp.task('image', function () {
    return gulp.src('./public/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./build/public/images'));
});

gulp.task('watch', function() {
    gulp.watch('./public/**/*.jade', ['jade']);
    gulp.watch('./public/**/*.js', ['js']);
    gulp.watch('./server/**/*.js', ['js']);
    gulp.watch('./server.js', ['js']);
    gulp.watch('./public/css/*.styl',['stylus']);
    gulp.watch('./public/css/*.css',['css']);
});

/*Live Reload*/
/*gulp.task('connect', connect.server({
    root: ['./build'],
    open: {browser: 'Google Chrome'}
}));*/