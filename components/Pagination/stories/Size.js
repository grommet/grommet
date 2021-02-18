"use strict";

exports.__esModule = true;
exports["default"] = exports.Size = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Size = function Size() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "start",
    pad: "small",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Small"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
    numberItems: 237,
    size: "small"
  })), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Medium (Default)"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
    numberItems: 237,
    size: "medium"
  })), /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
    numberItems: 237,
    size: "large"
  }))));
};

exports.Size = Size;
var _default = {
  title: 'Controls/Pagination/Size'
};
exports["default"] = _default;