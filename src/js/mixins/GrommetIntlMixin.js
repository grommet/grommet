// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var supportedLocales = ['en-US', 'pt-BR'];

function localesSupported() {
  return global.Intl && supportedLocales.every(function (locale) {
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

var React = require('react');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;

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
  },

  getGrommetFormattedDate: function (date) {
    return (
      <FormattedDate
        value={new Date(date)}
        day="numeric"
        month="numeric"
        year="numeric"
        hour="numeric"
        minute="numeric"
        second="numeric" />
    );
  },

  getGrommetIntlMessage: function(messageKey) {
    var message = messageKey;
    if(messageKey) {
      try {
        var i18nKey = messageKey.charAt(0).toLowerCase() + messageKey.slice(1);
        message = this.getIntlMessage(i18nKey);
      } catch (e) {
        message = messageKey;
      }
    }
    return message;
  }
};
