const gulp = require("gulp");
const { src, dest, watch, parallel, series} = require("gulp")
const imagemin = require('gulp-imagemin');

function imgMinfy() {
    return src('src/pics/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

exports.img = imgMinfy


const htmlmin = require('gulp-htmlmin');
function copyHtml() {
    return src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'));
}

exports.html = copyHtml

var cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat')
function cssMinify() {
    return src("src/css/**/*.css")

    .pipe(concat('style.min.css'))
    .pipe(cleanCss())
    .pipe(dest('dist/assets/css'));
}

exports.css = cssMinify

const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

function jsMinify() {
    return src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(contact('all.min.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

exports.js = jsMinify

var sass = require('gulp-sass');
function sassMinifay() {
    return src(["src/sass/**/*.sass", "src/css/**/*.css"])

    .pipe(sass())
    .pipe(concat('style.sass.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/assets/css'))
}

exports.sass = sassMinifay

function watchTask(){
    watch(['src/js/**/*.js', "src/css/**/*.css"], {interval:1000}, parallel(jsMinify, sassMinifay));
}

exports.watch = watchTask;
