// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var express = require('express');
//TODO: remove this after one month
var basicAuth = require('basic-auth-connect');
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var rest = require('./rest');

var PREFIX = '/ligo'; // for running under a shared domain
var PORT = 8000;

var app = express();

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

//TODO: remove this after one month :)
app.use(basicAuth('demo', 'Hp&Lig02015!'));

// doc index page
router.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../dist/doc/index.html'));
});
router.get('/index.js', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../dist/doc/index.js'));
});
router.use('/home', express.static('./'));

// Tour
router.get('/tour/init.html', function (req, res) {
  if (req.cookies.token) {
    res.redirect(req.baseUrl + '/tour/index.html');
  } else {
    res.redirect(req.baseUrl + '/tour/login.html');
  }
});

if (false) {
  // when using webpack-dev-server
  router.use('/tour', function (req, res) {
    var url = 'http://localhost:8080' + req.url;
    req.pipe(request(url)).pipe(res);
  });
} else {
  router.use('/tour', express.static('../piano2-tour/dist'));
  router.get('/tour/login.html', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../piano2-tour/dist/login.html'));
  });
  router.get('/tour/*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../piano2-tour/dist/index.html'));
  });
}

// Design
router.use('/design', express.static('../piano2-design/dist'));

// Docs
router.use('/docs', express.static('../piano2/dist/docs'));

// OneView
//router.use('/oneview', express.static('../oneview/dist'));
//router.get('/oneview/*', function (req, res) {
//  res.sendFile(path.resolve(__dirname + '/../oneview/dist/index.html'));
//});

app.
  use(PREFIX, router).
  use(PREFIX + '/rest', rest);

app.listen(PORT);
