"use strict";

exports.__esModule = true;
exports["default"] = exports.Controlled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Controlled = exports.Controlled = function Controlled() {
  var _useState = (0, _react.useState)(['Option 2']),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "xlarge",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "large",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "In multiple selection mode, enforce at least one selection."), /*#__PURE__*/_react["default"].createElement(_grommet.ToggleGroup, {
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: value,
    onToggle: function onToggle(e) {
      if (e.value.length) setValue(e.value);
    },
    multiple: true
  })));
};
var _default = exports["default"] = {
  title: 'Controls/ToggleGroup/Controlled'
};