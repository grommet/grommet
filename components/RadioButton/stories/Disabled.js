"use strict";

exports.__esModule = true;
exports["default"] = exports.Disabled = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Disabled = exports.Disabled = function Disabled() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButton, {
    label: "option 1",
    name: "name",
    value: "option 1",
    checked: true,
    disabled: true
  }));
};
var _default = exports["default"] = {
  title: 'Input/RadioButton/Disabled'
};