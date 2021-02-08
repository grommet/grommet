"use strict";

exports.__esModule = true;
exports["default"] = exports.Percentages = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Percentages = function Percentages() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    fill: true,
    areas: [{
      name: 'nav',
      start: [0, 0],
      end: [0, 0]
    }, {
      name: 'main',
      start: [1, 0],
      end: [1, 0]
    }],
    columns: ['small', 'flex'],
    rows: ['flex'],
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gridArea: "nav",
    background: "brand"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gridArea: "main",
    background: "brand"
  })));
};

exports.Percentages = Percentages;
var _default = {
  title: 'Layout/Grid/Percentages'
};
exports["default"] = _default;