"use strict";

exports.__esModule = true;
exports["default"] = exports.Fill = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Fill = function Fill() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "brand",
    fill: true
  }, "Test")));
};

exports.Fill = Fill;
var _default = {
  title: 'Layout/Stack/Fill'
};
exports["default"] = _default;