"use strict";

exports.__esModule = true;
exports["default"] = exports.Disabled = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Disabled = function Disabled() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButton, {
    label: "option 1",
    name: "name",
    value: "option 1",
    checked: true,
    disabled: true
  })));
};

exports.Disabled = Disabled;
var _default = {
  title: 'Input/RadioButton/Disabled'
};
exports["default"] = _default;