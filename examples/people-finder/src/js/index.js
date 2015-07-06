require("../scss/index.scss");
require("leaflet/dist/leaflet.css");

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Locale = require('grommet/utils/Locale');

var PeopleFinder = require('./components/PeopleFinder');

var rootPath = "/medium-app/";
if (__DEV_MODE__) {
  rootPath = "/"; // webpack-dev-server
}

var routes = (
  <Route name="app" path={rootPath} handler={PeopleFinder}>
  </Route>
);

var router = Router.create({routes: routes, location: Router.HistoryLocation});

router.run(function (Handler) {
  var element = document.getElementById('content');
  var locale = Locale.getCurrentLocale();
  var localeData;
  try {
    localeData = Locale.getLocaleData(require('../messages/' + locale));
  } catch (e) {
    localeData = Locale.getLocaleData(require('../messages/en-US'));
  }

  React.render(<Handler locales={localeData.locale} messages={localeData.messages} />, element);
});

document.body.classList.remove('loading');

var element = document.getElementById('content');
React.render(React.createElement(PeopleFinder), element);

document.body.classList.remove('loading');
