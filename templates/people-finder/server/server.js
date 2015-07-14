// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var compression = require('compression');
var express = require('express');
var http = require("http");
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ldap = require('./ldap');
var path = require('path');

var PORT = 8000;

var app = express();

app.use(compression());

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.redirect('/<%= appName %>');
});

app.use('/', require('./accept-language'));

var path = require('path');

var appRouter = express.Router();

// convert static assets to correct relative path
appRouter.use('/', function (req, res, next) {
  if (req.url.match(/.+\/img\//)) { // img
    res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, "/<%= appName %>/$1"));
  } else if (req.url.match(/\/img\//)) { // img
    next();
  } else if (req.url.match(/.+\/font\//)) { // font
    res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, "/<%= appName %>/$1"));
  } else if (req.url.match(/\/font\//)) { // font
    next();
  } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
    res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, "/<%= appName %>/$1"));
  } else {
    next();
  }
});

appRouter.use('/', express.static(path.join(__dirname, '/../dist')));
appRouter.get('/*', function (req, res) {
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

app.
  use('/ldap', ldap).
  use('/<%= appName %>', appRouter).
  use('', router);

var server = http.createServer(app);

server.listen(PORT);
