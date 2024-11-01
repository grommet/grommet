"use strict";

exports.__esModule = true;
exports.useId = void 0;
var _react = require("react");
var currentId = 0;
var getId = function getId() {
  // eslint-disable-next-line no-plusplus
  var id = currentId++;
  return ":r" + id.toString(32) + ":";
};
var useIdGrommet = function useIdGrommet() {
  var _useState = (0, _react.useState)(getId),
    id = _useState[0];
  return id;
};

// Polyfill React 18's useId for compatibility with React 16 and 17
var useId = exports.useId = _react.useId != null ? _react.useId : useIdGrommet;