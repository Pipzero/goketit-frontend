const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  babel = require('gulp-babel')
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  imagemin = require('gulp-imagemin'),
  pug = require('gulp-pug');
  // del = require('del');
  browserSync = require('browser-sync').create();

// sass tasks
gulp.task('sass', () =>
  gulp.src('src/scss/main.sass')
    .pipe(plumber())
    .pipe(postcss([autoprefixer()]))
    .pipe(sass({
      sourceComments: false,
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream())
);   

// javascript tasks
gulp.task('js', () =>
  gulp.src('src/js/main.js')
  .pipe(plumber())
  .pipe(babel({ presets: ['env'] }))
  // .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
);

// sass lint ftw(for better coding practices)
gulp.task('sass_lint', lintCssTask = () => {
  const gulpStylelint = require('gulp-stylelint');
  return gulp
    .src('src/scss/**/*.+(scss|sass)')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

// images optimization works with jpeg, jpg, svg, gif, png
gulp.task('images', () =>
  gulp.src('src/img/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('dist/img/'))
);

// Just copy/paste html to distribution folder
// gulp.task('html', () =>{
//   gulp.src(['src/**/*.html', 'partials'], { base: 'src' })
//     .pipe(gulp.dest('dist/'));
// });

// Pug Compiler (Formely known as Jade)
gulp.task('pug', function(){
  gulp.src( ['src/**/*.pug', '!src/partials/**/*.*'], { base: 'src' })
  .pipe(plumber())
	.pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dist/'));
});


// Static Server + watching html/scss/js files
gulp.task('default', ['pug', 'sass', 'js', 'images'], () => {
  browserSync.init({
      server: {
        baseDir: 'dist/'
      }
  });

	// gulp.watch('src/**/*.pug', ['pug']); // Pug
  gulp.watch('src/scss/**/**.+(scss|sass)', ['sass']);
  gulp.watch('src/img/**/**.+(jpg|gif|png)', ['images']);
  gulp.watch('src/js/main.js', ['js']);
  gulp.watch('src/**/*.pug', ['pug']).on('change', browserSync.reload);
  // gulp.watch('src/**/*.html', ['html']).on('change', browserSync.reload);
});
