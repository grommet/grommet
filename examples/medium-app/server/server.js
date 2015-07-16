// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var compression = require('compression');
var express = require('express');
var http = require("http");
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var rest = require('./rest');
var path = require('path');

var PORT = 8010;

var app = express();

app.use(compression());

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

var path = require('path');

app.
  use('/rest', rest.router).
  use('', router);

var server = http.createServer(app);

rest.setup(server);

server.listen(PORT);
