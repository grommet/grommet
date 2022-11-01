"use strict";

exports.__esModule = true;
exports["default"] = exports.Active = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Active = function Active() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    hoverIndicator: "light-1",
    onClick: function onClick() {},
    active: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Add")))));
};
exports.Active = Active;
var _default = {
  title: 'Controls/Button/Active'
};
exports["default"] = _default;