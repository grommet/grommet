// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import Cookies from './Cookies';

let currentLocale = 'en-US';

function normalizeLocale(locale) {
  let locales = locale.replace(/_/g, '-').split('-');
  let normalizedLocale = locales[0];
  if (locales.length > 1) {
    normalizedLocale += '-' + locales[1].toUpperCase();
  }

  return normalizedLocale;
}

module.exports = {
  setLocale(locale) {
    currentLocale = normalizeLocale(locale);
  },

  getCurrentLocale() {
    try {
      let cookieLanguages = Cookies.get('languages');
      let locale = cookieLanguages ? JSON.parse(cookieLanguages)[0] : undefined;
      if (!locale) {
        locale = window.navigator.languages ? window.navigator.languages[0] : (window.navigator.language || window.navigator.userLanguage);
      }

      return normalizeLocale(locale);
    } catch (e) {
      return currentLocale;
    }
  },

  getLocaleData(appMessages = {}, locale = this.getCurrentLocale()) {
    let grommetMessages;
    try {
      grommetMessages = require('../messages/' + locale);
    } catch (e) {
      grommetMessages = {};
    }

    let messages = Object.assign(grommetMessages, appMessages);

    return {locale, messages};
  }
};
