module.exports = function(gulp, options) {
  var jsxCoverageOptions = {
    istanbul: {
      coverageVariable: '__MY_TEST_COVERAGE__',
      exclude: /node_modules|test/
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
      require('../test/test-compiler');
      require('../test/mocked-dom')('<html><body></body></html>');

      jsxCoverage.initIstanbulHook(jsxCoverageOptions);
      gulp.src(options.testPaths, {
        read: false
      }).pipe(mocha({
        reporter: 'spec'})).once('end', function() {
          if (argv.w) {
            var watchFolders = options.testPaths.slice();
            options.jsAssets.forEach(function(jsAsset) {
              watchFolders.push(jsAsset);
            });
            watch(watchFolders, function() {
              gulp.src(options.testPaths, {
                read: false
              })
                .pipe(mocha({
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
        }).on('end', function() {
          jsxCoverage.colloectIstanbulCoverage(jsxCoverageOptions);
          console.log('Test coverage report available at coverage/lcov-report/index.html');
        });
    } else {
      done();
    }
  });

};


