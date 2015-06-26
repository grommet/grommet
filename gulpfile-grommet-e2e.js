var chug = require('gulp-chug');
var server = require('gulp-express');
var selenium = require('selenium-standalone');

module.exports = function(gulp) {
  gulp.task('selenium', function(done) {
    selenium.install({
      logger: function(message) {}
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
      tasks: ['dist']
    }));
  });

  gulp.task('start:docs', function() {
    return server.run(['./examples/server/server.js']);
  });

  function killProcess() {
    selenium.child.kill();
    server.stop();
  }

  function runIntegration() {
    var mocha = require('gulp-mocha');
    return gulp.src('./e2e/**/*.js', {
      read: false
    }).pipe(mocha()).on('end', function() {
      killProcess();
    }).on('error', function() {
      killProcess();
      process.exit(1);
    });
  }

  /**
  ** Windows e2e matrix
  **/
  gulp.task('integration:windows:ie', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'Windows 7';
    process.env.E2E_BROWSER_NAME = 'internet explorer';
    process.env.E2E_BROWSER_VERSION = '11.0';
    return runIntegration();
  });

  gulp.task('integration:windows:chrome', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'Windows 7';
    process.env.E2E_BROWSER_NAME = 'chrome';
    process.env.E2E_BROWSER_VERSION = '37.0';
    return runIntegration();
  });

  gulp.task('integration:windows:opera', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'Windows 7';
    process.env.E2E_BROWSER_NAME = 'opera';
    process.env.E2E_BROWSER_VERSION = '11.64';
    return runIntegration();
  });

  gulp.task('integration:windows:firefox', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'Windows 7';
    process.env.E2E_BROWSER_NAME = 'firefox';
    process.env.E2E_BROWSER_VERSION = '32.0';
    return runIntegration();
  });

  /**
  ** Linux e2e matrix
  **/
  gulp.task('integration:linux:firefox', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'Linux';
    process.env.E2E_BROWSER_NAME = 'firefox';
    process.env.E2E_BROWSER_VERSION = '32.0';
    return runIntegration();
  });

  gulp.task('integration:linux:opera', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'Linux';
    process.env.E2E_BROWSER_NAME = 'opera';
    process.env.E2E_BROWSER_VERSION = '12.15';
    return runIntegration();
  });

  gulp.task('integration:linux:chrome', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'Linux';
    process.env.E2E_BROWSER_NAME = 'chrome';
    process.env.E2E_BROWSER_VERSION = '37.0';
    return runIntegration();
  });

  /**
  ** OSX e2e matrix
  **/
  gulp.task('integration:osx:firefox', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'OS X 10.10';
    process.env.E2E_BROWSER_NAME = 'firefox';
    process.env.E2E_BROWSER_VERSION = '32.0';
    return runIntegration();
  });

  gulp.task('integration:osx:safari', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'OS X 10.10';
    process.env.E2E_BROWSER_NAME = 'safari';
    process.env.E2E_BROWSER_VERSION = '8.0';
    return runIntegration();
  });

  gulp.task('integration:osx:chrome', ['start:docs', 'selenium'], function() {
    process.env.E2E_PLATFORM = 'OS X 10.10';
    process.env.E2E_BROWSER_NAME = 'chrome';
    process.env.E2E_BROWSER_VERSION = '37.0';
    return runIntegration();
  });

  gulp.task('integration', ['start:docs', 'selenium'], function() {
    return runIntegration();
  });

};
