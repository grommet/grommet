var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var render = require('gulp-render');

gulp.task('copy', function() {
  /*
   gulp.src('./bower_components/ligo/*.css')
     .pipe(gulp.dest('./dist/css'));*/
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
  gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'));
  gulp.src('./node_modules/ligo/src/lib/*.js')
    .pipe(gulp.dest('./dist/lib'));
});

gulp.task('sass', function() {
  return sass('src/scss/', {
    loadPath: [
      'node_modules/ligo/src/scss',
      'bower_components'
    ],
    style: 'compact'
  })
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest('dist/css'));
});

gulp.task('dev', function () {
  gulp.watch(['./src/scss/*.scss', './node_modules/ligo/src/scss/**/*.scss'], ['sass']);
});

gulp.task('prerender', function () {
  return gulp.src('src/js/login.js')
      .pipe(render({template: 'src/_template.html'}))
      .pipe(gulp.dest('dist'));
});
