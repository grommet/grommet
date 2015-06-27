var chug = require('gulp-chug');
var server = require('gulp-express');
var selenium = require('selenium-standalone');
var runSequence = require('run-sequence');

module.exports = function(gulp) {
  gulp.task('selenium', function(done) {
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
  });

  gulp.task('dist:docs', function() {
    return gulp.src('./docs/gulpfile.js', {
      read: false
    }).pipe(chug({
      tasks: ['dist'],
      args: ['--skipPreprocess']
    }));
  });

  gulp.task('start:docs', ['dist:docs'], function() {
    return server.run(['./examples/server/server.js']);
  });

  function killProcess() {
    selenium.child.kill();
    server.stop();
  }

  function runIntegration(platform, browserName, version) {
    process.env.E2E_PLATFORM = platform;
    process.env.E2E_BROWSER_NAME = browserName;
    process.env.E2E_BROWSER_VERSION = version;

    var mocha = require('gulp-mocha');
    return gulp.src('./e2e/**/*.js', {
      read: false
    }).pipe(mocha()).on('error', function() {
      killProcess();
      process.exit(1);
    });
  }

  gulp.task('integration:clean', function () {
    killProcess();
  });

  /**
  ** Windows e2e matrix
  **/
  gulp.task('integration:windows:ie', function() {
    return runIntegration('Windows 7', 'internet explorer', '11.0');
  });

  gulp.task('integration:windows:chrome', function() {
    return runIntegration('Windows 7', 'chrome', '37.0');
  });

  gulp.task('integration:windows:firefox', function() {
    return runIntegration('Windows 7', 'firefox', '32.0');
  });

  gulp.task('integration:windows', ['start:docs', 'selenium'], function(done) {
    return runSequence('integration:windows:ie', 'integration:windows:chrome', 'integration:windows:firefox', 'integration:clean', done);
  });

  /**
  ** Linux e2e matrix
  **/
  gulp.task('integration:linux:firefox', function() {
    return runIntegration('Linux', 'firefox', '32.0');
  });

  gulp.task('integration:linux:opera', function() {
    return runIntegration('Linux', 'opera', '12.15');
  });

  gulp.task('integration:linux:chrome', function() {
    return runIntegration('Linux', 'chrome', '37.0');
  });

  gulp.task('integration:linux', ['start:docs', 'selenium'], function(done) {
    return runSequence('integration:linux:firefox', 'integration:linux:opera', 'integration:linux:chrome', 'integration:clean', done);
  });

  /**
  ** OSX e2e matrix
  **/
  gulp.task('integration:osx:firefox', function() {
    return runIntegration('OS X 10.10', 'firefox', '32.0');
  });

  gulp.task('integration:osx:safari', function() {
    return runIntegration('OS X 10.10', 'safari', '8.0');
  });

  gulp.task('integration:osx:chrome', function() {
    return runIntegration('OS X 10.10', 'chrome', '37.0');
  });

  gulp.task('integration:osx', ['start:docs', 'selenium'], function(done) {
    return runSequence('integration:osx:firefox', 'integration:osx:safari', 'integration:osx:chrome', 'integration:clean', done);
  });

  gulp.task('integration:localhost', ['start:docs', 'selenium'], function(done) {
    var mocha = require('gulp-mocha');
    gulp.src('./e2e/**/*.js', {
      read: false
    }).pipe(mocha()).on('end', function() {
      killProcess();
      done();
    }).on('error', function() {
      killProcess();
      process.exit(1);
    });
  });

};
