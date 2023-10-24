"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "medium",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
    name: "name",
    value: "value"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
    value: "value"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
    name: "name that is much longer and may need to wrap",
    value: "value"
  }));
};
var _default = exports["default"] = {
  title: 'Type/Tag/Simple'
};