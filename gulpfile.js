var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');

gulp.task('styles', function() {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('html', ['styles'], function() {
    var injectFiles = gulp.src(['./dist/css/main.css'])
    var injectOptions = {
        addRootSlash: false,
        ignorePath: ['dist']
    };

    gulp.src('./src/index.html')
        .pipe(inject(injectFiles, injectOptions))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('serve', function() {
    gulp.src('dist')
        .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', function() {
    gulp.watch('./src/sass/**/*.scss', ['styles']);
    gulp.watch('./src/*.html', ['html']);
})
