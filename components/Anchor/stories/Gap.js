"use strict";

exports.__esModule = true;
exports["default"] = exports.Gap = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var GapAnchor = function GapAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Upload, null),
    label: "Small Gap",
    href: "#",
    gap: "small"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Upload, null),
    label: "Medium Gap",
    href: "#",
    gap: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Upload, null),
    label: "Large Gap",
    href: "#",
    gap: "large"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Upload, null),
    label: "5px Gap",
    href: "#",
    gap: "5px"
  }));
};
var Gap = exports.Gap = function Gap() {
  return /*#__PURE__*/_react["default"].createElement(GapAnchor, null);
};
var _default = exports["default"] = {
  title: 'Controls/Anchor/Gap'
};