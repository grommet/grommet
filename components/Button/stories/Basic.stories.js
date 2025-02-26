"use strict";

exports.__esModule = true;
exports["default"] = exports.Basic = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var Basic = exports.Basic = function Basic(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    label: "Default",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Anchor",
    href: "#"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    disabled: true,
    label: "Disabled",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    primary: true,
    label: "Primary",
    onClick: function onClick() {}
  }, props))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    primary: true,
    label: "Active Primary",
    active: true,
    onClick: function onClick() {}
  }, props))));
};
var _default = exports["default"] = {
  title: 'Controls/Button/Basic'
};