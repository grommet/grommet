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
  require("index-hpe.scss");
  rootPath = '/docs/hpe/';
  theme = 'hpe';
} if (__THEME__.hpinc) {
  require("index-hpinc.scss");
  rootPath = '/docs/hpinc/';
  theme = 'hpinc';
} else if (__THEME__.generic) {
  require("index.scss");
}

if (__DEV_MODE__) {
  rootPath = "/"; // webpack-dev-server
}

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Docs = require('./Docs');
var Home = require('./Home');
var StyleGuide = require('./style_guide/StyleGuide');
var Documentation = require('./documentation/Documentation');
var Downloads = require('./downloads/Downloads');

var IntlMixin = require('grommet/mixins/GrommetIntlMixin');

var DocsRouter = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    return (
      <Docs theme={theme} />
    );
  }
});

var routes = (
  <Route name="docs" path='/' handler={DocsRouter}>
    <Route name="home" path='/' handler={Home} />
    {StyleGuide.routes()}
    {Documentation.routes()}
    <Route name="downloads" handler={Downloads} />
  </Route>
);

var router = Router.create({routes: routes, location: Router.HistoryLocation});

router.run(function (Handler) {
  var element = document.getElementById('content');
  var locale = window.navigator.userLanguage || window.navigator.language;
  React.render(<Handler locales={locale} />, element);
  document.querySelectorAll('.docs')[0].scrollTop = 0;
});

document.body.classList.remove('loading');
