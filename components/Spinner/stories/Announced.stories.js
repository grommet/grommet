"use strict";

exports.__esModule = true;
exports["default"] = exports.Announced = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var PageContent = function PageContent() {
  // 'show=true' will trigger the announcement
  var _useState = (0, _react.useState)(false),
    show = _useState[0],
    setShow = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    textAlign: "center"
  }, "Spinner has a built in Screen Reader functionality to assist screen readers. An announcement of the given message prop will be announced to screen readers after the spinner component renders."), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Load",
    onClick: function onClick() {
      setShow(true);
      setTimeout(function () {
        setShow(false);
      }, 1500);
    }
  }), show && /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    message: "Start Built-in Spinner Announcement"
  }));
};
var Announced = exports.Announced = function Announced() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(PageContent, null));
};
Announced.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Spinner/Announced'
};