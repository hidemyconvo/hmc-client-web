var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    plumber     = require('gulp-plumber'),
    order       = require("gulp-order")
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    minifyCSS   = require('gulp-minify-css'),
    browserify  = require('gulp-browserify'),
    autoprefix  = require('gulp-autoprefixer');

gulp.task('js', function () {
    return gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals : !gulp.env.production,
            debug : !gulp.env.production
        }))
        .pipe(gulp.env.production ? uglify() : gutil.noop())
        .pipe(gulp.dest('public/assets'));
});

gulp.task('css', function () {
    return gulp.src([
            'src/css/normalize.css',
            'src/css/main.css',
            'node_modules/**/*.css',
            '!node_modules/gulp*/**'
        ])
        .pipe(concat('main.css'))
        .pipe(autoprefix("last 1 version", "> 1%"))
        .pipe(gulp.env.production ? minifyCSS({}) : gutil.noop())
        .pipe(gulp.dest('public/assets'));
});

gulp.task('default', ['js', 'css']);

gulp.task('watch', function () {
    gulp.watch(['package.json', 'src/**/*'], ['default'])
});
