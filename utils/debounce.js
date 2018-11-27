"use strict";

exports.__esModule = true;
exports.debounceDelay = exports.debounce = void 0;

var _this = void 0;

var debounce = function debounce(cb, timer) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = _this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return cb.apply(context, args);
    }, timer);
  };
};

exports.debounce = debounce;

var debounceDelay = function debounceDelay(_ref) {
  var theme = _ref.theme;
  return theme.global.debounceDelay;
};

exports.debounceDelay = debounceDelay;