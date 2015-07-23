// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var compression = require('compression');
var express = require('express');
var http = require("http");
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var proxy = require('express-http-proxy');

var request = require('request');

var docs = require('./docs');
var ctoAppTuner = require('./cto-app-tuner');
var todoAppModular = require('./todo-app-modular');

var PORT = 8000;

var app = express();

app.use(compression());

app.use(cookieParser());

if (!process.env.SILENT_MODE) {
  app.use(morgan('tiny'));
}

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

app.use('/medium-app', proxy('localhost:8010', {
  forwardPath: function(req) {
    return '/medium-app' + require('url').parse(req.url).path;
  }
}));

//app.use('/people-finder', proxy('localhost:8020'));


app.use('/ldap', proxy('localhost:8020', {
  forwardPath: function(req) {
    return '/ldap' + require('url').parse(req.url).path;
  }
}));

app.use('/rest', proxy('localhost:8010', {
  forwardPath: function(req) {
    return '/rest' + require('url').parse(req.url).path;
  }
}));

app.use('/slackin', proxy('localhost:3000', {
  forwardPath: function(req) {
    return require('url').parse(req.url).path;
  }
}));

app.use('/socket.io', proxy('localhost:3000', {
  forwardPath: function(req) {
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
    root: path.join(__dirname, '/../docs/dist/assets/design'),
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
  use('/cto-app-tuner', ctoAppTuner).
  use('/todo-app-modular', todoAppModular).
  use('/hello-world', express.static(path.join(__dirname, '/../examples/hello-world'))).
  use('/assets', express.static(path.join(__dirname, '/../docs/dist/assets'))).
  use('/assets', express.static('/usr/local/lib/node_modules/slackin/lib/assets')).
  use('', router);

var server = http.createServer(app);

server.listen(PORT);

console.log('Server started, listening at: http://localhost:' + PORT + '...');
