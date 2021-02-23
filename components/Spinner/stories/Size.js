"use strict";

exports.__esModule = true;
exports["default"] = exports.Size = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Size = function Size() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    full: true
  }, ['xsmall', 'small', 'medium', 'large', 'xlarge'].map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      direction: "row",
      gap: "small",
      pad: "small",
      key: size
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
      size: size
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: size
    }, size));
  }));
};

exports.Size = Size;
var _default = {
  title: 'Visualizations/Spinner/Size'
};
exports["default"] = _default;