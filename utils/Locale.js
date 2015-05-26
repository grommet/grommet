// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var merge = require('lodash/object/merge');

function normalizeLocale(locale) {
  var locales = locale.replace(/_/g, '-').split('-');
  var normalizedLocale = locales[0];
  if (locales.length > 1) {
    normalizedLocale += '-'+locales[1].toUpperCase();
  }

  return normalizedLocale;
}

module.exports = {
  getCurrentLocale: function() {
    return normalizeLocale(window.navigator.userLanguage || window.navigator.language);
  },

  getLocaleData: function(appLocale) {
    var locale = this.getCurrentLocale();
    var grommetMessages;
    try {
      grommetMessages = require('../messages/' + locale);
    } catch (e) {
      console.warn(locale + ' not supported, fallback to English has been applied.');
      locale = 'en-US';
      grommetMessages = require('../messages/en-US');
    }

    var messages = merge(grommetMessages, appLocale || {});

    return {
      locale: locale,
      messages: messages
    };
  }
};
