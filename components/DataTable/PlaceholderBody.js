"use strict";

exports.__esModule = true;
exports.PlaceholderBody = void 0;
var _react = _interopRequireWildcard(require("react"));
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var PlaceholderBody = exports.PlaceholderBody = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    onSelect = _ref.onSelect,
    children = _ref.children;
  var colSpan = Math.max(columns.length + (onSelect ? 1 : 0), 1);
  return /*#__PURE__*/_react["default"].createElement("tbody", {
    ref: ref
  }, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    colSpan: colSpan
  }, children)));
});