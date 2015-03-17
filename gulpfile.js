var gulp = require('gulp');
var markdownDocs = require('gulp-markdown-docs');

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
