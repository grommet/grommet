"use strict";

exports.__esModule = true;
exports.useKeyboard = exports["default"] = void 0;
var _react = require("react");
var useKeyboard = exports.useKeyboard = function useKeyboard() {
  var _useState = (0, _react.useState)(),
    usingKeyboard = _useState[0],
    setUsingKeyboard = _useState[1];
  (0, _react.useEffect)(function () {
    var onMouseDown = function onMouseDown() {
      return setUsingKeyboard(false);
    };
    var onKeyDown = function onKeyDown() {
      return setUsingKeyboard(true);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return function () {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  return usingKeyboard;
};
var _default = exports["default"] = useKeyboard;