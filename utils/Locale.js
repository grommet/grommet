// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setLocale = setLocale;
exports.getCurrentLocale = getCurrentLocale;
exports.getLocaleData = getLocaleData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Cookies = require('./Cookies');

var _Cookies2 = _interopRequireDefault(_Cookies);

var currentLocale = 'en-US';

function normalizeLocale(locale) {
  var locales = locale.replace(/_/g, '-').split('-');
  var normalizedLocale = locales[0];
  if (locales.length > 1) {
    normalizedLocale += '-' + locales[1].toUpperCase();
  }

  return normalizedLocale;
}

function setLocale(locale) {
  currentLocale = normalizeLocale(locale);
}

function getCurrentLocale() {
  try {
    var cookieLanguages = _Cookies2['default'].get('languages');
    var locale = cookieLanguages ? JSON.parse(cookieLanguages)[0] : undefined;
    if (!locale) {
      locale = window.navigator.languages ? window.navigator.languages[0] : window.navigator.language || window.navigator.userLanguage;
    }

    return normalizeLocale(locale);
  } catch (e) {
    return currentLocale;
  }
}

function getLocaleData() {
  var appMessages = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var locale = arguments.length <= 1 || arguments[1] === undefined ? getCurrentLocale() : arguments[1];

  var grommetMessages = undefined;
  try {
    grommetMessages = require('../messages/' + locale);
  } catch (e) {
    grommetMessages = {};
  }

  var messages = Object.assign(grommetMessages, appMessages);

  return { locale: locale, messages: messages };
}