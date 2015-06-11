// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var compression = require('compression');
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
var proxy = require('express-http-proxy');
//var demo = require('./demo');

var PORT = 8000;

var app = express();

app.use(compression());

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.redirect('/docs');
});

app.use('/tour/', function (req, res) {
  res.redirect('/medium-app');
});

app.use('/slackin', proxy('grommet.io:3000', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

app.
  use('/docs', docs).
  use('/rest', rest.router).
  use('/medium-app', mediumApp).
  use('/cto-app-tuner', ctoAppTuner).
  use('/assets', express.static(path.join(__dirname, '/../../docs/dist/assets'))).
  use('/hello-world', express.static(path.join(__dirname, '/../hello-world'))).
  //use('/demo', demo).
  use('', router);

var server = http.createServer(app);

rest.setup(server);

server.listen(PORT);
