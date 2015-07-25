require("../scss/index.scss");

var React = require('react');
var Locale = require('grommet/utils/Locale');
var Cabler = require('./components/Cabler');

var locale = Locale.getCurrentLocale();
var localeData;
try {
  localeData = Locale.getLocaleData(require('../messages/' + locale));
} catch (e) {
  localeData = Locale.getLocaleData(require('../messages/en-US'));
}

var element = document.getElementById('content');
React.render(React.createElement(Cabler, {locales: localeData.locale, messages: localeData.messages}), element);

document.body.classList.remove('loading');
