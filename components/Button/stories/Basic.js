"use strict";

exports.__esModule = true;
exports["default"] = exports.Basic = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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