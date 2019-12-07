"use strict";

exports.__esModule = true;
exports.allSuggestions = exports.allOptions = void 0;
var allOptions = Array(100).fill().map(function (_, i) {
  return "option " + (i + 1);
});
exports.allOptions = allOptions;
var allSuggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});
exports.allSuggestions = allSuggestions;