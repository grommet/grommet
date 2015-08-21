// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require('modernizr');

if (! Modernizr.flexbox ||
  ! Modernizr.rgba) {
  alert('Unfortunately, your browser appears to be too old. ' +
    'We recommend the latest version of Chrome, Firefox, Safari, or Internet Explorer. ' +
    'If you are using the latest Internet Explorer, you will need to turn off Compatibility Mode.');
}

require("index-" + __THEME__ + ".scss");
var rootPath = '/docs/' + ('grommet' === __THEME__ ? '' : __THEME__ + '/');
var theme = __THEME__;

if (__DEV_MODE__) {
  rootPath = "/"; // webpack-dev-server
}

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Docs = require('./Docs');
var Home = require('./Home');
var Introduction = require('./Introduction');
var Design = require('./design/Design');
var Develop = require('./develop/Develop');
//var TBD = require('grommet/components/TBD');

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
  <Route name="docs" path={rootPath} handler={DocsRouter}>
    <Route name="home" path={rootPath} handler={Home} />
    <Route name="introduction" handler={Introduction} />
    {Design.routes()}
    {Develop.routes()}
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
