"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.WorldMap, null));
};
Simple.parameters = {
  // chromatic disabled because snapshot is the same as SelectPlace
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/WorldMap/Simple'
};