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

  it('downloads hpi general adobe illustrator sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var aiSelector = '#hpi #hpi-ai-general';
        browser.click(buttonSelector).getText(aiSelector).then(function(text) {
          expect(text).toBe('General Sticker Sheet');
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

  it('downloads hpi general adobe illustrator pdf sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var pdfSelector = '#hpi #hpi-ai-general-pdf';
        browser.click(buttonSelector).getText(pdfSelector).then(function(text) {
          expect(text).toBe('pdf');
          browser.getAttribute(pdfSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to pdf asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
    });
  });

  it('downloads hpe general adobe illustrator sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var aiSelector = '#hpe #hpe-ai-general';
        browser.click(buttonSelector).getText(aiSelector).then(function(text) {
          expect(text).toBe('General Sticker Sheet');
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

  it('downloads hpe general adobe illustrator pdf sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var pdfSelector = '#hpe #hpe-ai-general-pdf';
        browser.click(buttonSelector).getText(pdfSelector).then(function(text) {
          expect(text).toBe('pdf');
          browser.getAttribute(pdfSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to pdf asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
    });
  });

  it('downloads hpe classic adobe illustrator sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var aiSelector = '#hpe #hpe-ai-classic';
        browser.click(buttonSelector).getText(aiSelector).then(function(text) {
          expect(text).toBe('Classic Sticker Sheet');
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

  it('downloads hpe classic adobe illustrator pdf sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var pdfSelector = '#hpe #hpe-ai-classic-pdf';
        browser.click(buttonSelector).getText(pdfSelector).then(function(text) {
          expect(text).toBe('pdf');
          browser.getAttribute(pdfSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to pdf asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
    });
  });

  it('downloads hpe app-templates adobe illustrator sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var aiSelector = '#hpe #hpe-ai-app-templates';
        browser.click(buttonSelector).getText(aiSelector).then(function(text) {
          expect(text).toBe('Application Templates');
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

  it('downloads hpe app-templates adobe illustrator pdf sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var pdfSelector = '#hpe #hpe-ai-app-templates-pdf';
        browser.click(buttonSelector).getText(pdfSelector).then(function(text) {
          expect(text).toBe('pdf');
          browser.getAttribute(pdfSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to pdf asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
    });
  });

  it('downloads hpe icons adobe illustrator sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var aiSelector = '#hpe #hpe-ai-icons';
        browser.click(buttonSelector).getText(aiSelector).then(function(text) {
          expect(text).toBe('Icon Sticker Sheet');
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

  it('downloads hpe icons adobe illustrator pdf sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var pdfSelector = '#hpe #hpe-ai-icons-pdf';
        browser.click(buttonSelector).getText(pdfSelector).then(function(text) {
          expect(text).toBe('pdf');
          browser.getAttribute(pdfSelector, 'href').then(function(linkPath) {
            request.get(linkPath).end(function(err, res) {
              if (err) {
                should.fail('Expected to send a request to pdf asset.', err);
              }
              expect(res.status).toBe(200);
              done();
            });
          });
        });
      });
    });
  });

  it('downloads hpe sketch sticker sheet', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var sketchSelector = '#hpe #hpe-sk-general';
        browser.click(buttonSelector).getText(sketchSelector).then(function(text) {
          expect(text).toBe('Sketch Sticker Sheet');
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

  it('downloads hpe axure stencils', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var axureSelector = '#hpe #hpe-ax-general';
        browser.click(buttonSelector).getText(axureSelector).then(function(text) {
          expect(text).toBe('Axure Stencils');
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

  it('downloads hpe balsamiq assets', function(done) {
    var selector = '#design-link';

    browser.getText(selector, function (err, text) {
      if (err) {
        should.fail('Expected to find design link.', err);
      }
      expect(text).toBe('Design');
      var buttonSelector = '#resources-button';
      browser.click(selector).getText(buttonSelector).then(function(text) {
        expect(text).toBe('Resources');

        var balsamiqSelector = '#hpe #hpe-bq-general';
        browser.click(buttonSelector).getText(balsamiqSelector).then(function(text) {
          expect(text).toBe('Balsamiq Assets');
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
