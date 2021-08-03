"use strict";

exports.__esModule = true;
exports["default"] = exports.SemiCircle = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SemiCircle = function SemiCircle() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    size: "medium",
    type: "semicircle",
    background: "light-2",
    value: 60
  })));
};

exports.SemiCircle = SemiCircle;
var _default = {
  title: 'Visualizations/Meter/Semi Circle'
};
exports["default"] = _default;