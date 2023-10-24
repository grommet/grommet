"use strict";

exports.__esModule = true;
exports["default"] = exports.Maxlines = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var text = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";
var Maxlines = exports.Maxlines = function Maxlines() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    width: "small",
    pad: {
      horizontal: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    maxLines: 3
  }, text)), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    maxLines: 3
  }, text));
};
var _default = exports["default"] = {
  title: 'Type/Paragraph/Maxlines'
};