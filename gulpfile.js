var gulp = require('gulp'),
    jade = require('gulp-jade'),                    // compile jade to html
    del = require('del'),                           // clean the file before build
    runSequence = require('run-sequence'),          // run task one by one
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),                   // util tools
    stylus = require('gulp-stylus'),                // compile stylus to css
    sourcemaps = require('gulp-sourcemaps'),        // sourcemaps for stylus
    imagemin = require('gulp-imagemin'),            // compress images
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),              // keep gulp watching without stopping when error happen
    autoprefixer = require('gulp-autoprefixer'),    // auto add web prefix for you
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css');

var gConfig = require('./gulp/gulp.config.js');

//Default task
gulp.task('default', function(callback) {
    runSequence('build', ['browser-sync', 'watch'], callback);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'copy-build', callback); //run clean first, then copy-build
});

gulp.task('clean', function(callback) {
    del(['./build'], {force: true}, callback);
});

gulp.task('copy-build', ['jade', 'js', 'languages', 'stylus', 'css', 'vendor']);


/* jade tasks*/
gulp.task('jade', function(callback) {
    runSequence('jade-public', 'jade-server', callback);
});

gulp.task('jade-public', function() {
    return gulp.src(gConfig.app_file.jade_src)
        .pipe(plumber())
        .pipe(gulp.dest(gConfig.build.build_public))
        .pipe(reload({stream: true}));
});

gulp.task('jade-server', function() {
    return gulp.src(gConfig.server_file.jade_src)
        .pipe(plumber())
        .pipe(gulp.dest(gConfig.build.build_server));
});
/* jade task end*/

/* js task */
gulp.task('js', ['js-public', 'js-server', 'js1']);

gulp.task('js1', function() {
    return gulp.src(gConfig.server_file.entry)
        .pipe(gulp.dest(gConfig.build.dir));
});

gulp.task('js-public', function() {
    return gulp.src(gConfig.app_file.js_src)
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(jshint())
        .pipe(gulp.dest(gConfig.build.build_app))
        .pipe(reload({stream: true}));
});

gulp.task('js-server', function() {
    return gulp.src(gConfig.server_file.js_src)
        .pipe(gulp.dest(gConfig.build.build_server));
});
/* js task end*/

gulp.task('languages', function() {
    return gulp.src(gConfig.server_file.i18n_json)
        .pipe(gulp.dest(gConfig.build.build_i18n))
        .pipe(reload({stream: true}));
});

gulp.task('css', function() {
    return gulp.src(gConfig.app_file.css_src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(gConfig.build.build_css))
        .pipe(reload({stream: true}));
});

gulp.task('stylus', function() {
    return gulp.src(gConfig.app_file.styl_src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true,
            linenos: true
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(gConfig.build.build_css))
        .pipe(reload({stream: true}));
});

gulp.task('vendor', function() {
    gulp.src(gConfig.app_file.vendor_src)
        .pipe(gulp.dest(gConfig.build.build_vendor));
});

gulp.task('image', function() {
    return gulp.src(gConfig.app_file.images)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(gConfig.build.build_images));
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: 'localhost:3030'
    });
});

gulp.task('watch', function() {
    gulp.watch(gConfig.app_file.jade_src, ['jade']);
    gulp.watch(gConfig.app_file.js_src, ['js']);
    gulp.watch(gConfig.server_file.js_src, ['js']);
    gulp.watch(gConfig.server_file.entry, ['js']);
    gulp.watch(gConfig.app_file.styl_src, ['stylus']);
    gulp.watch(gConfig.app_file.css_src, ['css']);
    gulp.watch(gConfig.app_file.vendor_src, ['vendor']);
});