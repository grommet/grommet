// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var express = require('express');
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var docs = require('./docs');
var rest = require('./rest');
var tour = require('./tour');
var demo = require('./demo');

var PREFIX = ''; // for running under a shared domain
var PORT = 8000;

var app = express();

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.redirect('/docs');
});

app.
  use(PREFIX + '/docs', docs).
  use(PREFIX + '/rest', rest).
  use(PREFIX + '/tour', tour).
  use(PREFIX + '/demo', demo).
  use(PREFIX, router);

app.listen(PORT);
