// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var rest = require('./rest');

var PREFIX = ''; // for running under a shared domain
var PORT = 8010;

var app = express();

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

app.
  use(PREFIX + '/rest', rest).
  use(PREFIX, router);

app.listen(PORT);
