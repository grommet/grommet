"use strict";

exports.__esModule = true;
exports["default"] = exports.Color = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ColorAnchor = function ColorAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    href: "#"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: "Add",
    href: "#"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-1",
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    href: "#"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    href: "#"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: "Add",
    href: "#"
  })));
};

var Color = function Color() {
  return /*#__PURE__*/_react["default"].createElement(ColorAnchor, null);
};

exports.Color = Color;
var _default = {
  title: 'Controls/Anchor/Color'
};
exports["default"] = _default;