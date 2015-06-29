var assert = require('assert');
var should = require('should');

var GrommetE2EUtils = require('../src/utils/test/GrommetE2EUtils');

var options = {
  desiredCapabilities: {
    browserName: 'phantomjs'
  }
};

if (process.env.TRAVIS) {
  options = GrommetE2EUtils.getSauceLabsCIOptions(process.env.SAUCE_USERNAME,
    process.env.SAUCE_ACCESS_KEY);
}

var browser = GrommetE2EUtils.getBrowserClient(options);

var requestData = {
  sauceUsername: process.env.SAUCE_USERNAME,
  sauceAccessKey: process.env.SAUCE_ACCESS_KEY,
  failed: false
};

describe('Docs website e2e', function() {
  this.timeout(50000);

  before(function(done) {
    GrommetE2EUtils.configureBrowser(browser, 'http://localhost:8000/docs/',
     requestData, done);
  });

  it('loads the title for the docs home page', function(done) {
    browser
      .getTitle(function(err, title) {
        if (err) {
          should.fail('Expected the title to be returned.');
        }
        assert.equal(title, 'Grommet - User Experience for the Enterprise');
        done();
      });
  });

  afterEach(function(done) {
    if (process.env.TRAVIS) {
      requestData.state = this.currentTest.state;
      GrommetE2EUtils.reportResultsToSauceLabs(done, requestData);
    } else {
      done();
    }
  });

  after(function(done) {
    browser.end(done);
  });
});
