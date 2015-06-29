// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var request = require('superagent');

module.exports = {
  runIntegration: function(gulp, e2ePaths, onError, browserConfig) {
    if (e2ePaths) {
      if (browserConfig) {
        process.env.E2E_PLATFORM = browserConfig.platform;
        process.env.E2E_BROWSER_NAME = browserConfig.browserName;
        process.env.E2E_BROWSER_VERSION = browserConfig.version;
      }

      var mocha = require('gulp-mocha');
      var task = gulp.src('./' + e2ePaths, {
        read: false
      }).pipe(mocha());

      if (onError) {
        task.on('error', onError);
      }
      return task;
    } else {
      console.log('options.e2ePaths must be provided.');
    }
  },
  getSauceLabsCIOptions: function(sauceUsername, sauceAccessKey) {
    var title = 'Grommet Website E2E tests for: ' +
    process.env.E2E_BROWSER_NAME + ' version ' +
    process.env.E2E_BROWSER_VERSION;

    return {
      logLevel: 'command',
      host: 'ondemand.saucelabs.com',
      port: 80,
      user: sauceUsername,
      key: sauceAccessKey,
      desiredCapabilities: {
        browserName: process.env.E2E_BROWSER_NAME,
        version: process.env.E2E_BROWSER_VERSION,
        platform: process.env.E2E_PLATFORM,
        name: title,
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        build: process.env.TRAVIS_BUILD_NUMBER,
        visibility: 'public'
      }
    };
  },
  getBrowserClient: function(options) {
    return require('webdriverio').remote(options).init();
  },
  configureBrowser: function(browser, url, requestData, done) {
    browser.url(url).session(function (err, res) {
      if (err) {
        console.log(err);
      }

      requestData.sessionId = res.value['webdriver.remote.sessionid'];
      if (!requestData.sessionId) {
        console.log('Could not define the sessionId');
      }
      done();
    });
  },
  reportResultsToSauceLabs: function (done, options) {
    var authenticationKey = options.sauceUsername + ':' + options.sauceAccessKey;
    var updateJobPath = 'https://' + authenticationKey + '@saucelabs.com/rest/v1/' +
      options.sauceUsername + '/jobs/' + options.sessionId;
    if (options.state == 'failed') {
      options.failed = true;
      console.log('Test failed... sending the updated report to Sauce Labs.');
      request.put(updateJobPath)
      .send({ passed: false })
      .end(function (err, res) {
        if (err) {
          console.log('Could not communicate with sauce labs ', err);
        } else {
          console.log('Update has been successfully sent.');
        }
        done();
      });
    } else if (!options.failed) {
      console.log('Test passed... sending the updated report to Sauce Labs.');
      request.put(updateJobPath)
      .send({ passed: true })
      .end(function (err, res) {
        if (err) {
          console.log('Could not communicate with sauce labs ', err);
        } else {
          console.log('Update has been successfully sent.');
        }
        done();
      });
    } else {
      done();
    }
  }
};
