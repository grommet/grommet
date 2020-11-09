"use strict";

exports.__esModule = true;
exports.Dash = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Dash = function Dash() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "line",
    dash: true,
    values: [20, 30, 15]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "line",
    dash: true,
    round: true,
    values: [20, 30, 15]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "line",
    dash: true,
    thickness: "xsmall",
    values: [20, 30, 15]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "line",
    dash: true,
    round: true,
    thickness: "xsmall",
    values: [20, 30, 15]
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: "bar",
    dash: true,
    values: [[10, 20], [20, 30], [30, 15]]
  })));
};

exports.Dash = Dash;