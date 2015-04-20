var express = require('express');
var router = express.Router();
var path = require('path');

// Convert static resources defined by relative URLs when using HTML5 pushState
function translateStatics(req, res, next) {
  if (req.url.match(/.+\/img\//)) { // img
    res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, "/docs/hpe/$1"));
  } else if (req.url.match(/\/img\//)) { // img
    next();
  } else if (req.url.match(/.+\/font\//)) { // font
    res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, "/docs/hpe/$1"));
  } else if (req.url.match(/\/font\//)) { // font
    next();
  } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
    res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, "/docs/hpe/$1"));
  } else {
    next();
  }
}

router.use('/hpe', translateStatics);
router.use('/hpe', express.static('../../docs/dist/hpe'));
router.get('/hpe/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../docs/dist/hpe/index.html'));
});

router.use('/', translateStatics);
router.use('/', express.static('../../docs/dist'));
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../docs/dist/index.html'));
});

module.exports = router;
