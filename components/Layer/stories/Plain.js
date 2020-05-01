"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

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

(0, _react2.storiesOf)('Layer', module).add('Plain', function () {
  return /*#__PURE__*/_react["default"].createElement(PlainLayer, null);
});