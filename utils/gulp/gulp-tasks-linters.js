var path = require('path');
var eslint = require('gulp-eslint');
var merge = require('lodash/object/merge');
var exec = require('child_process');

function failLintBuild() {
  process.exit(1);
}

function scssLintExists() {
  var cmd = 'scss-lint';
  if (process.platform === 'win32') {
    cmd += '.cmd';
  }
  var args = ['--version'];
  var ret = exec.spawnSync(cmd, args);
  return ret && (ret.error === undefined);
}

module.exports = function(gulp, options) {

  var scssLintPath = path.resolve(__dirname, 'scss-lint.yml');
  var esLintPath = path.resolve(__dirname, 'eslintrc');
  var customEslint = options.customEslintPath ?
    require(options.customEslintPath) : {};

  gulp.task('scsslint', function() {
    if (options.scsslint) {
      if (scssLintExists()) {
        var scsslint = require('gulp-scss-lint');
        return gulp.src(options.scssAssets || []).pipe(scsslint({
          'config': scssLintPath
        })).pipe(scsslint.failReporter()).on('error', failLintBuild);
      } else {
        console.error('[scsslint] scsslint skipped!');
        console.error('[scsslint] scss-lint is not installed. Please install ruby and the ruby gem scss-lint.');
      }
    }
  });

  gulp.task('jslint', function() {
    var eslintRules = merge({
      configFile: esLintPath
    }, customEslint);
    return gulp.src(options.jsAssets || [])
      .pipe(eslint(eslintRules))
      .pipe(eslint.formatEach())
      .pipe(eslint.failOnError()).on('error', failLintBuild);
  });
};
