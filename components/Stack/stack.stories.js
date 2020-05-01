"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SimpleStack = function SimpleStack() {
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

var FillStack = function FillStack() {
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

(0, _react2.storiesOf)('Stack', module).add('Simple', function () {
  return /*#__PURE__*/_react["default"].createElement(SimpleStack, null);
}).add('Fill', function () {
  return /*#__PURE__*/_react["default"].createElement(FillStack, null);
});