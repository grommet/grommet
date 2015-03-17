var gulp = require('gulp');
var markdownDocs = require('gulp-markdown-docs');
var sass = require('gulp-ruby-sass');
var webpack = require('gulp-webpack');
var path = require('path');

gulp.task('copy', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(gulp.dest('./dist/scss'));
  gulp.src('./src/lib/*.js')
    .pipe(gulp.dest('./dist/lib'));
});

gulp.task('document', function() {
  gulp.src('./docs/docs.css')
    .pipe(gulp.dest('./dist/docs'));
  gulp.src('./docs/**/*.md')
    .pipe(markdownDocs('index.html', {
      yamlMeta: true,
      categorySort: 'rank',
      highlightTheme: 'github',
      templatePath: './docs/template.html',
      stylesheetUrl: 'docs.css',
      layoutStylesheetUrl: false
    }))
    .pipe(gulp.dest('./dist/docs/'));
});

gulp.task('build', ['copy', 'document']);

gulp.task('dev', function () {
  gulp.watch(['./src/scss/*.scss', './src/lib/*.js', './src/img/*'], ['copy']);
  gulp.watch(['./docs/**/*.md', './docs/docs.css', './docs/template.html'], ['document']);
});

/**
* CONFIGURATION FOR DOC MODULE
**/
gulp.task('doc-copy', function() {
  gulp.src('docs/index.html')
      .pipe(gulp.dest('dist/doc/'));
  gulp.src('src/lib/*')
      .pipe(gulp.dest('dist/doc/'));
});

gulp.task('doc-sass', function() {
  return sass('src/scss/ligo-doc', {
    loadPath: [
      'bower_components'
    ],
    style: 'compact'
  })
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest('dist/doc'));
});

gulp.task('doc-webpack', function() {
  return gulp.src('docs/index.js')
        .pipe(webpack({
          output: {
            filename: 'index.js'
          },
          resolve: {
            root: path.resolve(__dirname, 'src/js/doc')
          },
          module: {
            loaders: [
              {
                test: /\.js$/,
                loader: 'jsx-loader'
              }
            ]
          }
        }))
        .pipe(gulp.dest('dist/doc/'));
});

gulp.task('doc', ['doc-copy', 'doc-sass', 'doc-webpack']);
gulp.task('doc-dev', function() {
  gulp.watch(['./docs/**'], ['doc']);
});

