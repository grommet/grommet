var express = require('express');
var router = express.Router();
var path = require('path');

var React = require('react');
var Router = require('react-router');
var sass = require('node-sass');
var theme = require('./theme');

var fs = require('fs');

function getThemeCss(theme) {
  var extension = theme !== 'grommet-core' ? ('-' + theme) + '.min.css' : '-grommet.min.css';
  return fs.readFileSync(path.resolve(__dirname, 'css/' + 'docs' + extension), 'utf8');
}

// Convert static resources defined by relative URLs when using HTML5 pushState
function translateStatics(req, res, next, theme) {
  if (req.url.match(/.+\/img\//)) { // img
    res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, "/docs/" + theme + "$1"));
  } else if (req.url.match(/\/img\//)) { // img
    next();
  } else if (req.url.match(/.+\/font\//)) { // font
    res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, "/docs/" + theme + "$1"));
  } else if (req.url.match(/\/font\//)) { // font
    next();
  } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
    res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, "/docs/" + theme + "$1"));
  } else {
    next();
  }
}

function processPage(req, res, theme) {

  delete require.cache[require.resolve('./server-routes.js')];
  var docsRoutes = require('./server-routes.js');

  var path = theme !== 'grommet-core' ? ('/' + theme) : '';

  var reactRouter = Router.create({
    location: '/docs' + path + req.url.replace(path, ''),
    routes: docsRoutes('/docs' + path + '/')
  });

  reactRouter.run(function(Handler, state) {
    var Component = React.createFactory(Handler);
    var html = React.renderToString(Component({}));
    res.render('index.ejs', {appBody: html, styleContent: '<style>' + getThemeCss(theme) + '</style>'});
  });
}

router.use('/hpe', function (req, res, next) {
  if (req.url === '/') {
    processPage(req, res, 'hpe');
  } else {
    translateStatics(req, res, next, 'hpe/');
  }
});
router.use('/hpe', express.static(path.join(__dirname, '/../docs/dist/hpe')));
router.get('/hpe/*', function(req, res) {
  processPage(req, res, 'hpe');
});

router.use('/hpinc', function (req, res, next) {
  if (req.url === '/') {
    processPage(req, res, 'hpinc');
  } else {
    translateStatics(req, res, next, 'hpinc/');
  }
});
router.use('/hpinc', express.static(path.join(__dirname, '/../docs/dist/hpinc')));
router.get('/hpinc/*', function(req, res) {
  processPage(req, res, 'hpinc');
});

router.use('/aruba', function (req, res, next) {
  if (req.url === '/') {
    processPage(req, res, 'aruba');
  } else {
    translateStatics(req, res, next, 'aruba/');
  }
});
router.use('/aruba', express.static(path.join(__dirname, '/../docs/dist/aruba')));
router.get('/aruba/*', function(req, res) {
  processPage(req, res, 'aruba');
});

router.use('/', function (req, res, next) {
  if (req.url === '/') {
    processPage(req, res, 'grommet-core');
  } else {
    translateStatics(req, res, next, '');
  }
});
router.use('/', express.static(path.join(__dirname, '/../docs/dist')));
router.get('/*', function(req, res) {
  processPage(req, res, 'grommet-core');
});

module.exports = router;
