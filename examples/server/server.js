// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var express = require('express');
var http = require("http");
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var docs = require('./docs');
var rest = require('./rest');
var mediumApp = require('./medium-app');
var ctoAppTuner = require('./cto-app-tuner');
//var demo = require('./demo');

var PREFIX = ''; // for running under a shared domain
var PORT = 8000;

var app = express();

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.redirect('/docs');
});

app.use('/tour/', function (req, res, next) {
  res.redirect('/medium-app');
});

app.
  use(PREFIX + '/docs', docs).
  use(PREFIX + '/rest', rest.router).
  use(PREFIX + '/medium-app', mediumApp).
  use(PREFIX + '/cto-app-tuner', ctoAppTuner).
  use(PREFIX + '/assets', express.static('../../assets')).
  //use(PREFIX + '/demo', demo).
  use(PREFIX, router);

var server = http.createServer(app);

rest.setup(server);

server.listen(PORT);
