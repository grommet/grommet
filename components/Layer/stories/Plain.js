"use strict";

exports.__esModule = true;
exports["default"] = exports.PlainLayer = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PlainLayer = function PlainLayer() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    background: "dark-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    margin: "medium",
    plain: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    border: {
      color: 'accent-1',
      size: 'large'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "accent-2"
  }, "Text")))));
};

exports.PlainLayer = PlainLayer;
PlainLayer.storyName = 'Plain';
var _default = {
  title: 'Layout/Layer/Plain'
};
exports["default"] = _default;