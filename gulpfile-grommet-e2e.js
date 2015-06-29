var chug = require('gulp-chug');
var server = require('gulp-express');
var runSequence = require('run-sequence');

var GrommetTestUtils = require('./src/utils/test/GrommetE2EUtils');

module.exports = function(gulp, options) {

  gulp.task('dist:docs', function() {
    return gulp.src('./docs/gulpfile.js', {
      read: false
    }).pipe(chug({
      tasks: ['dist'],
      args: ['--skipPreprocess']
    }));
  });

  gulp.task('start:docs', ['dist:docs'], function() {
    server.stop();
    return server.run(['./examples/server/server.js']);
  });

  gulp.task('stop:docs', function() {
    server.stop();
  });

  var onError = function() {
    server.stop();
  }

  /**
  ** Windows e2e matrix
  **/
  gulp.task('integration:windows:ie', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'Windows 7',
      browserName: 'internet explorer',
      version: '11.0'
    });
  });

  gulp.task('integration:windows:chrome', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'Windows 7',
      browserName: 'chrome',
      version: '37.0'
    });
  });

  gulp.task('integration:windows:firefox', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'Windows 7',
      browserName: 'firefox',
      version: '32.0'
    });
  });

  gulp.task('integration:windows', ['start:docs', 'selenium'], function(done) {
    return runSequence('integration:windows:ie', 'integration:windows:chrome',
      'integration:windows:firefox', 'integration:clean', 'stop:docs', done);
  });

  /**
  ** Linux e2e matrix
  **/
  gulp.task('integration:linux:firefox', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'Linux',
      browserName: 'firefox',
      version: '32.0'
    });
  });

  gulp.task('integration:linux:opera', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'Linux',
      browserName: 'opera',
      version: '12.15'
    });
  });

  gulp.task('integration:linux:chrome', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'Linux',
      browserName: 'chrome',
      version: '37.0'
    });
  });

  gulp.task('integration:linux', ['start:docs', 'selenium'], function(done) {
    return runSequence('integration:linux:firefox', 'integration:linux:opera',
     'integration:linux:chrome', 'integration:clean', 'stop:docs', done);
  });

  /**
  ** OSX e2e matrix
  **/
  gulp.task('integration:osx:firefox', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'OS X 10.10',
      browserName: 'firefox',
      version: '32.0'
    });
  });

  gulp.task('integration:osx:safari', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'OS X 10.10',
      browserName: 'safari',
      version: '8.0'
    });
  });

  gulp.task('integration:osx:chrome', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError, {
      platform: 'OS X 10.10',
      browserName: 'chrome',
      version: '37.0'
    });
  });

  gulp.task('integration:osx', ['start:docs', 'selenium'], function(done) {
    return runSequence('integration:osx:firefox', 'integration:osx:safari',
     'integration:osx:chrome', 'integration:clean', 'stop:docs', done);
  });

  gulp.task('integration:phantomjs', function() {
    return GrommetTestUtils.runIntegration(gulp, options.e2ePaths, onError);
  });

  gulp.task('integration:localhost', ['start:docs', 'selenium'], function(done) {
    return runSequence('integration:phantomjs', 'integration:clean', 'stop:docs', done);
  });

};
