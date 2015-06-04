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
var path = require('path');
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
  use(path.join(PREFIX, 'docs'), docs).
  use(path.join(PREFIX, 'rest'), rest.router).
  use(path.join(PREFIX, 'medium-app'), mediumApp).
  use(path.join(PREFIX, 'cto-app-tuner'), ctoAppTuner).
  use(path.join(PREFIX, 'assets'), express.static(path.join(__dirname, '/../../docs/dist/assets'))).
  use(path.join(PREFIX, 'hello-world'), express.static(path.join(__dirname, '/../hello-world'))).
  //use(PREFIX + '/demo', demo).
  use(PREFIX, router);

var server = http.createServer(app);

rest.setup(server);

server.listen(PORT);
