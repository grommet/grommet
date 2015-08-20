var path = require('path');
var react = require('gulp-react');
var eslint = require('gulp-eslint');
var merge = require('lodash/object/merge');

function failLintBuild() {
  process.exit(1);
}

module.exports = function(gulp, options) {

  var scssLintPath = path.resolve(__dirname, 'scss-lint.yml');
  var esLintPath = path.resolve(__dirname, 'eslintrc');
  var customEslint = options.customEslintPath ?
    require(options.customEslintPath) : {};

  gulp.task('scsslint', function() {
    if (options.scsslint) {
      var scsslint = require('gulp-scss-lint');
      return gulp.src(options.scssAssets || []).pipe(scsslint({
        'config': scssLintPath
      })).pipe(scsslint.failReporter()).on('error', failLintBuild);
    }
  });

  gulp.task('jslint', function() {
    var eslintRules = merge({
      configFile: esLintPath
    }, customEslint);
    return gulp.src(options.jsAssets || [])
      .pipe(react())
      .pipe(eslint(eslintRules))
      .pipe(eslint.formatEach())
      .pipe(eslint.failOnError()).on('error', failLintBuild);
  });
};
