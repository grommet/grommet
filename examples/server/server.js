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
var mediumAppDev = require('./medium-app-dev');
var ctoAppTuner = require('./cto-app-tuner');
var todoAddModular = require('./todo-app-modular');
var path = require('path');
var proxy = require('express-http-proxy');
//var demo = require('./demo');
var request = require('request');

var PORT = 8000;

var app = express();

app.use(compression());

app.use(cookieParser());

app.use(morgan('tiny'));

app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.redirect('/docs');
});

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

app.use('/tour/', function (req, res) {
  res.redirect('/medium-app');
});

app.use('/slackin', proxy('localhost:3000', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

app.use('/socket.io', proxy('localhost:3000', {
  forwardPath: function(req, res) {
    return '/socket.io' + require('url').parse(req.url).path;
  }
}));

app.use('/invite', function(req, res) {
  var data = req.body;
  if (!data.channels) {
    data.channels = ['general'];
  }
  request.post({uri: 'http://localhost:3000/invite', json: data}).pipe(res);
});

app.get('/assets/design/:name', function(req, res) {
  var options = {
    root: path.join(__dirname, '/../../docs/dist/assets/design'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  // Express uses the mime.lookup() method in the node-mime
  // https://github.com/broofa/node-mime project to determine
  // a file's mime type.  This method returns the mime type
  // of 'application/postscript' for Adobe Illustrator files
  // and this results in Safari attempting to show a preview of
  // the file in the browser.  So we'll check for Illustrator
  // files and handle them as a special case for now.
  if (/\.ai$/.test(req.params.name) ) {
    res.type('application/illustrator');
  } else {
    res.type(req.params.name);
  }

  res.sendFile(req.params.name, options);
});

app.
  use('/docs', docs).
  use('/rest', rest.router).
  use('/medium-app', mediumApp).
  use('/medium-app-dev', mediumAppDev).
  use('/cto-app-tuner', ctoAppTuner).
  use('/todo-app-modular', todoAddModular).
  use('/assets', express.static(path.join(__dirname, '/../../docs/dist/assets'))).
  use('/assets', express.static('/usr/local/lib/node_modules/slackin/lib/assets')).
  use('/hello-world', express.static(path.join(__dirname, '/../hello-world'))).
  //use('/demo', demo).
  use('', router);

var server = http.createServer(app);

rest.setup(server);

server.listen(PORT);
