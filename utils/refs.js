"use strict";

exports.__esModule = true;
exports.useForwardedRef = void 0;
var _react = require("react");
var useForwardedRef = exports.useForwardedRef = function useForwardedRef(ref) {
  var innerRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return innerRef.current;
  }, [innerRef]);
  return innerRef;
};