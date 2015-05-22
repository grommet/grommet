// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var supportedLocales = ['en-US', 'pt-BR'];

function localesSupported() {
  return supportedLocales.every(function (locale) {
    return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale &&
            Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
  });
}

if (! localesSupported()) {
  require('intl/Intl');
  IntlPolyfill.__addLocaleData(require('intl/locale-data/json/en-US.json'));
  IntlPolyfill.__addLocaleData(require('intl/locale-data/json/pt-BR.json'));
  Intl.NumberFormat = IntlPolyfill.NumberFormat;
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;

module.exports = {
  mixins: [IntlMixin],

  getChildContext: function () {
    if (!this.props.locales && !this.context.locales) {
      this.context.locales = 'en-US';
    }

    if (!this.props.messages && !this.context.messages) {
      try {
        this.context.messages = require('../messages/' + (this.props.locales || this.context.locales || 'en-US'));
      } catch (e) {
        this.context.messages = require('../messages/en-US');
      }
    }
  }
};
