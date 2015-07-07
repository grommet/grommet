var expect = require('expect');
var should = require('should');
var request = require('superagent');

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

  beforeEach(function(done) {
    GrommetE2EUtils.configureBrowser(browser, 'http://localhost:8000/docs/',
      requestData, done);
  });

  it('loads the title for the docs home page', function(done) {
    browser
      .getTitle(function(err, title) {
        if (err) {
          should.fail('Expected the title to be returned.', err);
        }
        expect(title).toBe('Grommet - User Experience for the Enterprise');
        done();
      });
  });

  it('downloads adobe illustrator sticker sheet', function(done) {
    var selector = '.header .menu a:nth-child(1)';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '.background-color-index-neutral-1 a:nth-child(1)';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var aiSelector = '#illustrator p:last-of-type a';
        browser.click(buttonSelector).getText(aiSelector).then(function(text) {
          expect(text).toBe('Download Adobe Illustrator Sticker Sheet');
          browser.getAttribute(aiSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to ai asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
    });
  });

  it('downloads sketch sticker sheet', function(done) {
    var selector = '.header .menu a:nth-child(1)';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '.background-color-index-neutral-1 a:nth-child(1)';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var sketchSelector = '#sketch p:last-of-type a';
        browser.click(buttonSelector).getText(sketchSelector).then(function(text) {
          expect(text).toBe('Download Sketch Sticker Sheet');
          browser.getAttribute(sketchSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to sketch asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
    });
  });

  it('downloads axure sticker sheet', function(done) {
    var selector = '.header .menu a:nth-child(1)';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '.background-color-index-neutral-1 a:nth-child(1)';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var axureSelector = '#axure p:last-of-type a';
        browser.click(buttonSelector).getText(axureSelector).then(function(text) {
          expect(text).toBe('Download Axure Stencils');
          browser.getAttribute(axureSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to axure asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
    });
  });

  it('downloads balsamiq sticker sheet', function(done) {
    var selector = '.header .menu a:nth-child(1)';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '.background-color-index-neutral-1 a:nth-child(1)';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var balsamiqSelector = '#balsamiq p:last-of-type a';
        browser.click(buttonSelector).getText(balsamiqSelector).then(function(text) {
          expect(text).toBe('Download Balsamiq Assets');
          browser.getAttribute(balsamiqSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to balsamiq asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
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
