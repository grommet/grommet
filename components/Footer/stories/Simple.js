"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Main, {
    background: "light-2",
    elevation: "large",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
    background: "light-4",
    justify: "center",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    textAlign: "center",
    size: "small"
  }, "\xA9 2019 Copyright Grommet")));
};

(0, _react2.storiesOf)('Footer', module).add('Simple', function () {
  return /*#__PURE__*/_react["default"].createElement(Simple, null);
});