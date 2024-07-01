"use strict";

exports.__esModule = true;
exports.useDebounce = exports["default"] = void 0;
var _react = require("react");
var _useThemeValue = require("./useThemeValue");
var useDebounce = exports.useDebounce = function useDebounce(debounceDelay) {
  var _useState = (0, _react.useState)(),
    func = _useState[0],
    setFunc = _useState[1];
  var theme = (0, _useThemeValue.useThemeValue)();
  var delay = debounceDelay || theme.global.debounceDelay;
  (0, _react.useEffect)(function () {
    var timer;
    if (func) timer = setTimeout(function () {
      return func();
    }, delay);
    return function () {
      return clearTimeout(timer);
    };
  }, [func, delay]);
  return setFunc;
};
var _default = exports["default"] = useDebounce;