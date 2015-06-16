var express = require('express');
var router = express.Router();
var path = require('path');

// convert static assets to correct relative path
router.use('/', function (req, res, next) {
  if (req.url.match(/.+\/img\//)) { // img
    res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, "/medium-app-dev/$1"));
  } else if (req.url.match(/\/img\//)) { // img
    next();
  } else if (req.url.match(/.+\/font\//)) { // font
    res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, "/medium-app-dev/$1"));
  } else if (req.url.match(/\/font\//)) { // font
    next();
  } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
    res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, "/medium-app-dev/$1"));
  } else {
    next();
  }
});

router.use('/', express.static(path.join(__dirname, '/../medium-app/dist-dev')));
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(path.join(__dirname, '/../medium-app/dist-dev/index.html')));
});

module.exports = router;
