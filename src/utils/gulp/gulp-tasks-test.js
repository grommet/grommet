var babel = require('gulp-babel');
var glob = require('glob');
var path = require('path');

module.exports = function(gulp, options) {

  var jsxCoverageOptions = {
    src: options.testPaths || [],
    istanbul: {
      coverageVariable: '__MY_TEST_COVERAGE__',
      exclude: /node_modules|test|icons|lib|index/
    },
    coverage: {
      reporters: ['lcov'],
      directory: 'coverage'
    }
  };

  gulp.task('test', function(done) {
    if (options.testPaths) {
      var jsxCoverage = require('gulp-jsx-coverage');
      var mocha = require('gulp-mocha');
      var watch = require('gulp-watch');
      var argv = require('yargs').argv;

      jsxCoverage.initIstanbulHook(jsxCoverageOptions);

      glob.sync('**src/js/**/*.js').forEach(function (file) {
        if (file.indexOf('lib') === -1 &&
          file.indexOf('icons') === -1) {
          require(path.resolve(file));
        }
      });

      gulp.src(options.testPaths, {
        read: false
      }).pipe(babel()).pipe(mocha({
        reporter: 'spec'})).once('end', function() {
          if (argv.w) {
            var watchFolders = options.testPaths.slice();
            options.jsAssets.forEach(function(jsAsset) {
              watchFolders.push(jsAsset);
            });
            watch(watchFolders, function() {
              gulp.src(options.testPaths, {
                read: false
              }).pipe(mocha({
                reporter: 'spec'
              })).once('end', function() {
                console.log('Watching for changes...');
              }).on('error', function(err) {
                console.error('Test failed:', err.stack || err);
                if (argv.w) {
                  this.emit('end');
                } else {
                  process.exit(1);
                }
              });
            });
            console.log('Watching for changes...');
          } else {
            done();
          }
        }).on('error', function(err) {
          console.error('Test failed:', err.stack || err);
          if (argv.w) {
            this.emit('end');
          } else {
            process.exit(1);
          }
        }).on('end', jsxCoverage.colloectIstanbulCoverage(jsxCoverageOptions)).on('end', function() {
          console.log('Test coverage report available at coverage/lcov-report/index.html');
        });
    } else {
      done();
    }
  });

  var selenium;

  gulp.task('integration:clean', function () {
    if (selenium) {
      selenium.child.kill();
    }
  });

  gulp.task('selenium', function(done) {
    if (options.e2ePaths) {
      selenium = require('selenium-standalone');
      selenium.install({
        logger: function() {}
      }, function(err) {
        if (err) {
          return done(err);
        }

        selenium.start(function(err, child) {
          if (err) {
            return done(err);
          }

          if (process.env.TRAVIS) {
            child.stderr.on('data', function(data) {
              console.log(data.toString());
            });
          }

          //saving the child to kill it later (oops)
          selenium.child = child;
          done();
        });
      });
    } else {
      console.log('You need options.e2ePaths to start the selenium server.');
    }
  });
};
