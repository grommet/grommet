"use strict";

exports.__esModule = true;
exports["default"] = exports.Color = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Color = function Color() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.WorldMap, {
    color: "graph-1"
  }));
};
exports.Color = Color;
Color.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/WorldMap/Color'
};
exports["default"] = _default;