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

router.use('/', express.static('../tour/dist'));
router.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../tour/dist/index.html'));
});

module.exports = router;