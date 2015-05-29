var express = require('express');
var router = express.Router();
var path = require('path');
/*
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();

router.all(/\/index.js|\/webpack-dev-server.js/, function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:8001'
  });
});
*/

// convert static assets to correct relative path
router.use('/', function (req, res, next) {
  if (req.url.match(/.+\/img\//)) { // img
    res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, "/medium-app/$1"));
  } else if (req.url.match(/\/img\//)) { // img
    next();
  } else if (req.url.match(/.+\/font\//)) { // font
    res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, "/medium-app/$1"));
  } else if (req.url.match(/\/font\//)) { // font
    next();
  } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
    res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, "/medium-app/$1"));
  } else {
    next();
  }
});

router.use('/', express.static('../medium-app/dist'));
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../medium-app/dist/index.html'));
});

module.exports = router;