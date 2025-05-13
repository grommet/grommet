"use strict";

exports.__esModule = true;
exports["default"] = exports.Toast = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Button = require("../../Button");
var _Box = require("../../Box");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var TitleAndMessageNotification = function TitleAndMessageNotification() {
  var _useState = (0, _react.useState)(false),
    visible = _useState[0],
    setVisible = _useState[1];
  var onOpen = function onOpen() {
    return setVisible(true);
  };
  var onClose = function onClose() {
    return setVisible(undefined);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: "large",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    label: "Show Notification",
    onClick: onOpen
  })), visible && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: true,
    title: "Status Title",
    message: "Messages should be at max two lines of text.",
    onClose: onClose
  }));
};
var Toast = exports.Toast = function Toast() {
  return /*#__PURE__*/_react["default"].createElement(TitleAndMessageNotification, null);
};
Toast.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Notification/Toast'
};