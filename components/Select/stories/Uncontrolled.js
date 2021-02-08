"use strict";

exports.__esModule = true;
exports["default"] = exports.Uncontrolled = void 0;

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
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    id: "select",
    name: "select",
    placeholder: "Select",
    options: ['one', 'two'],
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return console.log(option);
    }
  })));
};

exports.Uncontrolled = Uncontrolled;
Uncontrolled.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/Select/Uncontrolled'
};
exports["default"] = _default;