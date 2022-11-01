"use strict";

exports.__esModule = true;
exports["default"] = exports.Size = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Size = function Size() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    direction: "row",
    gap: "medium",
    wrap: true
  }, ['xsmall', 'small', 'medium', 'large', 'xlarge'].map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "medium",
      align: "start",
      key: size
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: size,
      weight: "bold"
    }, size), /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
      name: "Name",
      value: "Value",
      size: size
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
      value: "Value",
      size: size
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Tag, {
      value: "Value",
      size: size,
      onRemove: function onRemove() {}
    }));
  }));
};
exports.Size = Size;
var _default = {
  title: 'Type/Tag/Size'
};
exports["default"] = _default;