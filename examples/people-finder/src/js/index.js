// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require('modernizr');

if (! Modernizr.flexbox ||
  ! Modernizr.rgba) {
  alert('Unfortunately, your browser appears to be too old. ' +
    'We recommend the latest version of Chrome, Firefox, Safari, or Internet Explorer. ' +
    'If you are using the latest Internet Explorer, you will need to turn off Compatibility Mode.');
}

require("../scss/index.scss");
require("leaflet/dist/leaflet.css");

var React = require('react');
var Locale = require('grommet/utils/Locale');
var PeopleFinder = require('./components/PeopleFinder');

var locale = Locale.getCurrentLocale();
var localeData;
try {
  localeData = Locale.getLocaleData(require('../messages/' + locale));
} catch (e) {
  localeData = Locale.getLocaleData(require('../messages/en-US'));
}

var element = document.getElementById('content');
React.render(React.createElement(PeopleFinder, {locales: localeData.locale, messages: localeData.messages}), element);

document.body.classList.remove('loading');
