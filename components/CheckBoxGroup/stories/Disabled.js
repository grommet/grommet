"use strict";

exports.__esModule = true;
exports.Disabled = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Disabled = function Disabled() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
    options: [{
      label: 'Maui',
      disabled: true
    }, {
      label: 'Jerusalem'
    }, {
      label: 'Wuhan',
      disabled: true
    }]
  }))));
};

exports.Disabled = Disabled;