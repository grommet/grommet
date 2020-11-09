"use strict";

exports.__esModule = true;
exports.Uncontrolled = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Uncontrolled = function Uncontrolled() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    onChange: function onChange(event) {
      return console.log('Change', event.target.value);
    }
  }))));
};

exports.Uncontrolled = Uncontrolled;
Uncontrolled.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};