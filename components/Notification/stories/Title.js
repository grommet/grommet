"use strict";

exports.__esModule = true;
exports["default"] = exports.ToastTitleOnly = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Button = require("../../Button");
var _Box = require("../../Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var TitleNotification = function TitleNotification() {
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
    onClose: onClose,
    time: 4000
  }));
};
var ToastTitleOnly = exports.ToastTitleOnly = function ToastTitleOnly() {
  return /*#__PURE__*/_react["default"].createElement(TitleNotification, null);
};
ToastTitleOnly.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Notification/Toast Title Only'
};