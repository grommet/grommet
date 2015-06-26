var assert = require('assert');
var should = require('should');

var options = {
  desiredCapabilities: {
    logLevel: 'silent',
    browserName: 'phantomjs'
  }
};

if (process.env.TRAVIS) {
  options.host = 'ondemand.saucelabs.com';
  options.port = 80;
  options.user = process.env.SAUCE_USERNAME;
  options.key = process.env.SAUCE_ACCESS_KEY;
}

var client = require('webdriverio').remote(options).init();

describe('Docs website e2e', function () {
  this.timeout(5000);

  before(function (done) {
    client.url('http://localhost:8000/docs/', done);
  });

  it('loads the title for the docs home page', function (done) {
    client
      .getTitle(function (err, title) {
        if (err) {
          should.fail('Expected the title to be returned.');
        }
        assert.equal(title, 'Grommet - User Experience for the Enterprise');
        done();
      });
  });

  after(function (done) {
    client.end(done);
  });
});
