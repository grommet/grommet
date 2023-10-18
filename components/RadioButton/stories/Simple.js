"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  var _React$useState = _react["default"].useState(),
    selected = _React$useState[0],
    setSelected = _React$useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButton, {
    label: "option 1",
    name: "name",
    value: "option 1",
    checked: selected === 'option 1',
    onChange: function onChange(event) {
      return setSelected(event.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "clear",
    onClick: function onClick() {
      return setSelected(undefined);
    }
  }));
};
var _default = exports["default"] = {
  title: 'Input/RadioButton/Simple'
};