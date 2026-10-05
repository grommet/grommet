"use strict";

exports.__esModule = true;
exports["default"] = exports.NonClosableHeader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var steps = [{
  id: 'details',
  title: 'Details',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Enter the request details.");
  }
}, {
  id: 'review',
  title: 'Review',
  render: function render() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Review the request before submitting.");
  }
}];
var NonClosableHeader = exports.NonClosableHeader = function NonClosableHeader() {
  var _useState = (0, _react.useState)(false),
    saved = _useState[0],
    setSaved = _useState[1];
  var title = /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "medium",
    flex: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 1,
    size: "small",
    margin: "none"
  }, "New request"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Save draft",
    onClick: function onClick() {
      return setSaved(true);
    }
  }));
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "New request",
    closable: false,
    title: title,
    showProgress: "horizontal",
    steps: steps
  }), saved && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Draft saved",
    onClose: function onClose() {
      return setSaved(false);
    }
  }));
};
NonClosableHeader.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Non Closable Header'
};