"use strict";

exports.__esModule = true;
exports["default"] = exports.Fill = exports.Simple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    anchor: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    background: "neutral-1"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: "accent-1"
  })));
};

exports.Simple = Simple;

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
  title: 'Layout/Stack'
};
exports["default"] = _default;