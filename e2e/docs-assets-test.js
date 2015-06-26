var assert = require('assert');
var should = require('should');

var options = {
  desiredCapabilities: {
    browserName: 'phantomjs'
  }
};

var client;
if (process.env.TRAVIS) {
  options = {
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    browserA: {
      desiredCapabilities: {
        browserName: 'chrome',
        version: '27',
        platform: ['Windows 7', 'Windows 8']
      }
    },
    browserB: {
      desiredCapabilities: {
        browserName: 'internet explorer',
        version: '9',
        platform: 'Windows 7'
      }
    }

  };

  client = require('webdriverio').multiremote(options).init();
} else {
  client = require('webdriverio').remote(options).init();
}

describe('Docs website e2e', function() {
  this.timeout(1000000);

  before(function(done) {
    client.url('http://localhost:8000/docs/', done);
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