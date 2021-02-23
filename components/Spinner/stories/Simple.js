"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "small",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Loading...")));
};

exports.Simple = Simple;
var _default = {
  title: 'Visualizations/Spinner/Simple'
};
exports["default"] = _default;