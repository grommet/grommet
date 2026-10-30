"use strict";

exports.__esModule = true;
exports["default"] = exports.Toast = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Button = require("../../Button");
var _Box = require("../../Box");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

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