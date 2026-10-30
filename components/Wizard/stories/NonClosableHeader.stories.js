"use strict";

exports.__esModule = true;
exports["default"] = exports.NonClosableHeader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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