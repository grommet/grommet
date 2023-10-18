"use strict";

exports.__esModule = true;
exports["default"] = exports.Disabled = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Disabled = exports.Disabled = function Disabled() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: {
      vertical: 'small'
    }
  }, "Disabled Group"), /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    disabled: true,
    options: ['First', 'Second', 'Third']
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: {
      vertical: 'small'
    }
  }, " Disabled Individuals"), /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    name: "destinations",
    valueKey: "id",
    "aria-labelledby": "drink-formfield-id",
    options: [{
      label: 'Maui',
      id: '1',
      disabled: true
    }, {
      label: 'Jerusalem',
      id: '2'
    }, {
      label: 'Wuhan',
      id: '3',
      disabled: true
    }]
  })));
};
var _default = exports["default"] = {
  title: 'Input/CheckBoxGroup/Disabled'
};