// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
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
    if (typeof module !== 'undefined' && module.exports) {
      return fallbackLocale;
    }
    var cookieLanguages = Cookies.get('languages');
    var locale = cookieLanguages ? JSON.parse(cookieLanguages)[0] : undefined;
    if (!locale) {
      locale = window.navigator.languages ? window.navigator.languages[0] : window.navigator.language || window.navigator.userLanguage;
    }

    return normalizeLocale(locale || fallbackLocale);
  },

  getLocaleData: function getLocaleData(appMessages) {
    var locale = this.getCurrentLocale();
    var grommetMessages;
    try {
      grommetMessages = require('../messages/' + locale);
    } catch (e) {
      grommetMessages = {};
    }

    var messages = merge(grommetMessages, appMessages || {});

    return {
      locale: locale,
      messages: messages
    };
  }
};