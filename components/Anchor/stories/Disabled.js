"use strict";

exports.__esModule = true;
exports.Disabled = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DisabledAnchor = function DisabledAnchor() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    disabled: true,
    label: "Disabled Anchor"
  }))));
};

var Disabled = function Disabled() {
  return /*#__PURE__*/_react["default"].createElement(DisabledAnchor, null);
};

exports.Disabled = Disabled;