// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var express = require('express');
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var rest = require('./rest');

var PREFIX = ''; // for running under a shared domain
var PORT = 8000;
var USE_WEBPACK_HOT_MODULE_RELOAD = false;

var app = express();

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

if (USE_WEBPACK_HOT_MODULE_RELOAD) {
  // when using webpack-dev-server
  router.use('/*', function (req, res) {
    var url = 'http://localhost:8001' + req.originalUrl;
    req.pipe(request(url)).pipe(res);
  });
} else {
  router.use('/', express.static('../tour/dist'));
  router.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../tour/dist/index.html'));
  });
}

app.
  use(PREFIX + '/rest', rest).
  use(PREFIX, router);

app.listen(PORT);
