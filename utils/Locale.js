// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
'use strict';

var merge = require('lodash/object/merge');
var Cookies = require('./Cookies');
var fallbackLocale = 'en-US';

function normalizeLocale(locale) {
  var locales = locale.replace(/_/g, '-').split('-');
  var normalizedLocale = locales[0];
  if (locales.length > 1) {
    normalizedLocale += '-' + locales[1].toUpperCase();
  }

  return normalizedLocale;
}

module.exports = {
  getCurrentLocale: function getCurrentLocale() {
    var cookieLanguages = Cookies.get('languages');
    var locale = cookieLanguages ? JSON.parse(cookieLanguages)[0] : undefined;
    if (!locale) {
      locale = window.navigator.languages ? window.navigator.languages[0] : window.navigator.language || window.navigator.userLanguage;
    }

    return normalizeLocale(locale || fallbackLocale);
  },

  getLocaleData: function getLocaleData(appLocale) {
    var locale = this.getCurrentLocale();
    var grommetMessages;
    try {
      grommetMessages = require('../messages/' + locale);
    } catch (e) {
      console.warn(locale + ' not supported, fallback to English has been applied.');
      locale = fallbackLocale;
      grommetMessages = require('../messages/en-US');
    }

    var messages = merge(grommetMessages, appLocale || {});

    return {
      locale: locale,
      messages: messages
    };
  }
};