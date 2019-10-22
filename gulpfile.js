const
  { src, dest, series, parallel } = require('gulp')
  gulp = require('gulp')
  sass = require('gulp-sass')
  sourcemaps = require('gulp-sourcemaps')
  postcss = require('gulp-postcss')
  autoprefixer = require('autoprefixer')
  imagemin = require('gulp-imagemin')
  babel = require('gulp-babel')
  uglify = require('gulp-uglify')
  plumber = require('gulp-plumber')
  pug = require('gulp-pug')
  concat = require('gulp-concat')
  browserSync = require('browser-sync').create()


function html() {
  return src('src/**/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('dist'))
}

function images() {
  return src('src/img/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(dest('dist/img'))
}

function css() {
  return src('src/scss/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded', errLogToConsole: true }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

function js() {
  return gulp.src('src/js/main.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
}

// Static server
function watch() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })
  gulp.watch('src/**/*.pug', html).on('change', browserSync.reload)
  gulp.watch('src/scss/**/**.+(scss|sass)', css).on('change', browserSync.reload)
  gulp.watch('src/js/**/*.js', js).on('change', browserSync.reload)
}

exports.html = html
exports.images = images
exports.css = css
exports.js = js

exports.watch = series(html, images, css, js, watch)