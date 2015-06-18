var path = require('path');

module.exports = function(gulp, options) {
  gulp.task('test', function(done) {
    if (options.testPaths) {
      var mocha = require('gulp-mocha');
      var watch = require('gulp-watch');
      var argv = require('yargs').argv;
      require('../test/test-compiler');
      require('../test/mocked-dom')('<html><body></body></html>');

      gulp.src(options.testPaths, {
        read: false
      })
        .pipe(mocha({
          reporter: 'spec'
        })).once('end', function() {
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
      });
    } else {
      done();
    }
  });

  gulp.task('coverage', ['test'], function(done) {
    if (options.testPaths) {
      var blanket = require('gulp-blanket-mocha');
      gulp.src(options.testPaths, {
        read: false
      })
        .pipe(blanket({
          instrument: [path.join(process.cwd(), 'src/js')],
          captureFile: 'test/coverage.html',
          reporter: 'html-cov'
        }));
      console.log('Done! You can checkout the report at test/coverage.html.');
    } else {
      console.log('No test found, please specify testPaths as an option.');
    }
    done();
  });
};
