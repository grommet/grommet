"use strict";

exports.__esModule = true;
exports["default"] = exports.Disabled = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _themes = require("grommet/themes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var customThemeRangeInput = {
  rangeInput: {
    disabled: {
      track: {
        color: '#2196f3'
      },
      thumb: {
        color: 'red'
      }
    }
  }
};
var Disabled = exports.Disabled = function Disabled() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customThemeRangeInput
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    disabled: true,
    value: 5,
    a11yTitle: "Select range value"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    disabled: true,
    value: 5,
    a11yTitle: "Select range value"
  }))));
};
var _default = exports["default"] = {
  title: 'Input/RangeInput/Custom Themed/Disabled'
};