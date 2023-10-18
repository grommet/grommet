"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    options: ['First', 'Second', 'Third']
  }));
};
var _default = exports["default"] = {
  title: 'Input/CheckBoxGroup/Simple'
};