"use strict";

exports.__esModule = true;
exports["default"] = exports.Weight = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WeightAnchor = function WeightAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor default weight"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight Normal",
    weight: "normal"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight Bold",
    weight: "bold"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight 200",
    weight: "200"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight 400",
    weight: "400"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight 600",
    weight: "600"
  })));
};

var Weight = function Weight() {
  return /*#__PURE__*/_react["default"].createElement(WeightAnchor, null);
};

exports.Weight = Weight;
var _default = {
  title: 'Controls/Anchor/Weight'
};
exports["default"] = _default;