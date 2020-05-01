"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ElevationBox = function ElevationBox() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    background: "dark-1",
    elevation: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "dark on white"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    elevation: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "dark on dark"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    background: "light-1",
    elevation: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "light on dark"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    elevation: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "light on light")))))));
};

(0, _react2.storiesOf)('Box', module).add('Elevation', function () {
  return /*#__PURE__*/_react["default"].createElement(ElevationBox, null);
});