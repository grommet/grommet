"use strict";

exports.__esModule = true;
exports["default"] = exports.Color = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Color = function Color() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "accent-1"
  }, "Colored Text"));
};

exports.Color = Color;
var _default = {
  title: 'Type/Text/Color'
};
exports["default"] = _default;