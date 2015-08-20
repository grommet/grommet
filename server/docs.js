var express = require('express');
var router = express.Router();
var path = require('path');

// Convert static resources defined by relative URLs when using HTML5 pushState
function translateStatics(req, res, next, theme) {
  if (req.url.match(/.+\/img\//)) { // img
    res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, "/docs/" + theme + "$1"));
  } else if (req.url.match(/\/img\//)) { // img
    next();
  } else if (req.url.match(/.+\/font\//)) { // font
    res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, "/docs/" + theme + "$1"));
  } else if (req.url.match(/\/font\//)) { // font
    next();
  } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
    res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, "/docs/" + theme + "$1"));
  } else {
    next();
  }
}

router.use('/hpe', function(req, res, next) {
  translateStatics(req, res, next, 'hpe/');
});
router.use('/hpe', express.static(path.join(__dirname, '/../docs/dist/hpe')));
router.get('/hpe/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../docs/dist/hpe/index.html'));
});

router.use('/hpinc', function(req, res, next) {
  translateStatics(req, res, next, 'hpinc/');
});
router.use('/hpinc', express.static(path.join(__dirname, '/../docs/dist/hpinc')));
router.get('/hpinc/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../docs/dist/hpinc/index.html'));
});

router.use('/aruba', function(req, res, next) {
  translateStatics(req, res, next, 'aruba/');
});
router.use('/aruba', express.static(path.join(__dirname, '/../docs/dist/aruba')));
router.get('/aruba/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../docs/dist/aruba/index.html'));
});

router.use('/', function(req, res, next) {
  translateStatics(req, res, next, '');
});
router.use('/', express.static(path.join(__dirname, '/../docs/dist')));
router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../docs/dist/index.html'));
});

module.exports = router;
