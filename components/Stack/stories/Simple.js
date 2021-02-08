"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    anchor: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    background: "neutral-1"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    background: "accent-1"
  })));
};

exports.Simple = Simple;
var _default = {
  title: 'Layout/Stack/Simple'
};
exports["default"] = _default;