"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

exports.default = {
  toSentenceCase: function toSentenceCase(text) {
    return text.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  quoteIfNecessary: function quoteIfNecessary(text) {
    // quote if there are embedded spaces
    if (text.indexOf(' ') !== -1) {
      text = "'" + text + "'";
    }
    return text;
  },
  unquoteIfNecessary: function unquoteIfNecessary(text) {
    // remove surrounding quotes
    if (text[0] === '\'' && text[text.length - 1] === '\'' || text[0] === '"' && text[text.length - 1] === '"') {
      text = text.slice(1, text.length - 1);
    }
    return text;
  }
};
module.exports = exports["default"];