'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

exports.setLocale = setLocale;
exports.getCurrentLocale = getCurrentLocale;
exports.getLocaleData = getLocaleData;

var _Cookies = require('./Cookies');

var _Cookies2 = _interopRequireDefault(_Cookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var cookieLanguages = _Cookies2.default.get('languages');
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
  var appMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentLocale();

  var grommetMessages = void 0;
  try {
    grommetMessages = require('../messages/' + locale);
  } catch (e) {
    grommetMessages = {};
  }

  var messages = _extends({}, grommetMessages, appMessages);

  return { locale: locale, messages: messages };
}