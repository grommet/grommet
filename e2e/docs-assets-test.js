var assert = require('assert');
var should = require('should');

var client = require('webdriverio').remote({
  desiredCapabilities: {
    logLevel: process.env.TRAVIS ? 'command' : 'silent',
    browserName: 'phantomjs'
  }
}).init();

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
