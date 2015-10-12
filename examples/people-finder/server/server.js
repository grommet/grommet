// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var compression = require('compression');
var express = require('express');
var http = require("http");
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var ldap = require('./ldap');

var PORT = 8020;

var app = express();

app.use(compression());

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

app.
  use('/ldap', ldap).
  use('', router);

app.use('/', function(req, res, next) {
  var acceptLanguageHeader = req.headers['accept-language'];

  if (acceptLanguageHeader) {
    var acceptedLanguages = acceptLanguageHeader.match(/[a-zA-z\-]{2,10}/g);
    if (acceptedLanguages) {
      res.cookie('languages', JSON.stringify(acceptedLanguages));
    }
  }

  next();
});

app.use('/', express.static(path.join(__dirname, '/../dist')));
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

var server = http.createServer(app);

server.listen(PORT);

console.log('Server started, listening at: http://localhost:' + PORT + '...');
