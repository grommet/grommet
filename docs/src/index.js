// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require('imports?this=>window!modernizr');

if (! Modernizr.flexbox ||
  ! Modernizr.localstorage ||
  ! Modernizr.rgba ||
  ! Modernizr.draganddrop) {
  alert('Unfortunately, your browser appears to be too old. ' +
    'We recommend the latest version of Chrome, Firefox, Safari, or Internet Explorer. ' +
    'If you are using the latest Internet Explorer, you will need to turn off Compatibility Mode.');
}

var rootPath = '/docs/';
var theme = 'generic';

if (__THEME__.hpe) {
  require("!style!css!sass!index-hpe.scss");
  rootPath = '/docs/hpe/';
  theme = 'hpe';
} else {
  require("!style!css!sass!index.scss");
}

if ("/" === window.location.pathname) {
  rootPath = "/"; // webpack-dev-server
}

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Docs = require('./Docs');
var Home = require('./Home');
var RequestAccess = require('./RequestAccess');
var StyleGuide = require('./style_guide/StyleGuide');
var Documentation = require('./documentation/Documentation');
var Downloads = require('./downloads/Downloads');

var routes = (
  <Route name="docs" path={rootPath} handler={Docs}>
    <Route name="home" path={rootPath} handler={Home}>
      <Route name="request_access" handler={RequestAccess} />
    </Route>
    {StyleGuide.routes()}
    {Documentation.routes()}
    <Route name="downloads" handler={Downloads} />
  </Route>
);

var router = Router.create({routes: routes, location: Router.HistoryLocation});

router.run(function (Handler) {
  var factory = React.createFactory(Handler);
  var element = document.getElementById('content');
  React.render(factory(), element);
  document.querySelectorAll('.docs')[0].scrollTop = 0;
});

document.body.classList.remove('loading');
