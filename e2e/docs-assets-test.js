var assert = require('assert');
var should = require('should');
var request = require('superagent');

var options = {
  desiredCapabilities: {
    browserName: 'phantomjs'
  }
};

if (process.env.TRAVIS) {
  var title = 'Grommet Website E2E tests for: ' +
    process.env.E2E_BROWSER_NAME + ' version ' +
    process.env.E2E_BROWSER_VERSION;

  options = {
    logLevel: 'command',
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
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
}

var client = require('webdriverio').remote(options).init();
var sessionId;

describe('Docs website e2e', function() {
  this.timeout(50000);

  before(function(done) {
    client.url('http://localhost:8000/docs/').session(function (err, res) {
      if (err) {
        console.log(err);
      }

      sessionId = res.value['webdriver.remote.sessionid'];
      if (!sessionId) {
        console.log('Could not define the sessionId');
      }
      done();
    });
  });

  it('loads the title for the docs home page', function(done) {
    client
      .getTitle(function(err, title) {
        if (err) {
          should.fail('Expected the title to be returned.');
        }
        assert.equal(title, 'Grommet - User Experience for the Enterprise');
        done();
      });
  });

  var failed = false;
  afterEach(function(done) {
    if (process.env.TRAVIS) {
      var authenticationKey = process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY;
      var updateJobPath = 'https://' + authenticationKey + '@saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/jobs/' + sessionId;
      if (this.currentTest.state == 'failed') {
        failed = true;
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
      } else if (!failed) {
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
    } else {
      done();
    }
  });

  after(function(done) {
    client.end(done);
  });
});
