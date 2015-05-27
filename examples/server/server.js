// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var docs = require('./docs');
var rest = require('./rest');
var tour = require('./tour');
var ctoAppTuner = require('./cto-app-tuner');
//var demo = require('./demo');

var PREFIX = ''; // for running under a shared domain
var PORT = 8000;

var app = express();

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.redirect('/docs/hpe');
});

app.
  use(PREFIX + '/docs', docs).
  use(PREFIX + '/rest', rest).
  use(PREFIX + '/tour', tour).
  use(PREFIX + '/cto-app-tuner', ctoAppTuner).
  //use(PREFIX + '/demo', demo).
  use(PREFIX, router);

app.listen(PORT);
