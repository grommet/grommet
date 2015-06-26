var assert = require('assert');
var should = require('should');

var options = {
  desiredCapabilities: {
    logLevel: 'command',
    browserName: 'phantomjs'
  }
};

if (process.env.TRAVIS) {
  options = {
    logLevel: 'command',
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    desiredCapabilities: {
      browserName: 'internet explorer',
      name: 'Docs website scenarios for internet explorer.',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      build: process.env.$TRAVIS_BUILD_NUMBER,
      visibility: 'public'
    }
  };
}

var client = require('webdriverio').remote(options).init();

describe('Docs website e2e', function() {
  this.timeout(1000000);

  before(function(done) {
    client.url('http://localhost:8000/docs/', function () {
      client.sessions(function (id) {
        console.log('Session ID is ' + id);
        global.sessionId = id;
        done();
      });
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

  after(function(done) {
    client.end(done);
  });
});
