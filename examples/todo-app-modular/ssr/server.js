// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var compression = require('compression');
var express = require('express');
var http = require("http");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var sass = require('node-sass');

var React = require('react/addons');

var webpackRequire = require('enhanced-require')(module, {
  resolve: {
    alias: {
      'grommet': path.resolve(__dirname, '../../../src/js')
    },
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules\/intl|node_modules\/moment|node_modules\/react)/
      }
    ]
  }
});

var server = express();
var TodoApp = React.createFactory(webpackRequire('../src/js/TodoApp'));

var theme = sass.renderSync({
  file: path.resolve(__dirname, '../../../src/scss/grommet-core/index'),
  includePaths: [path.resolve(__dirname, '../../../node_modules')]
});

var PORT = 8050;

var app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());

app.use(morgan('tiny'));

app.use(bodyParser.json());

app.get('/', function (req, res) {

  // server side rendering with react + webpack
  var todoAppHtml = React.renderToString(TodoApp({}));
  res.render('index.ejs', {appBody: todoAppHtml, styleContent: '<style>' + theme.css + '</style>'});

  //for single page app uncomment following line (remember to comment the 2 lines above)
  //res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

app.use('/', express.static(path.join(__dirname, '/../dist')));

var server = http.createServer(app);
server.listen(PORT);

console.log('Server started, listening at: http://localhost:8050...');
