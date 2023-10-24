"use strict";

exports.__esModule = true;
exports["default"] = exports.Weight = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var WeightAnchor = function WeightAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
    weight: 200
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight 400",
    weight: 400
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight 600",
    weight: 600
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight Lighter",
    weight: "lighter"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight Bolder",
    weight: "bolder"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight Inherit",
    weight: "inherit"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight Initial",
    weight: "initial"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight Revert",
    weight: "revert"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "#",
    label: "Anchor weight Unset",
    weight: "unset"
  }));
};
var Weight = exports.Weight = function Weight() {
  return /*#__PURE__*/_react["default"].createElement(WeightAnchor, null);
};
var _default = exports["default"] = {
  title: 'Controls/Anchor/Weight'
};