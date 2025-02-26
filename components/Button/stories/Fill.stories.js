"use strict";

exports.__esModule = true;
exports["default"] = exports.Fill = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Fill = exports.Fill = function Fill(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    justify: "center",
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    pad: "medium",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    justify: "center",
    align: "center",
    height: "100px",
    width: "300px"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props)))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    justify: "center",
    align: "center",
    height: "700px",
    width: "300px",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "False",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "True",
    fill: true,
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Horizontal",
    fill: "horizontal",
    onClick: function onClick() {}
  }, props)), /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Vertical",
    fill: "vertical",
    onClick: function onClick() {}
  }, props))));
};
var _default = exports["default"] = {
  title: 'Controls/Button/Fill'
};