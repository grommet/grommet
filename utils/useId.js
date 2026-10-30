"use strict";

exports.__esModule = true;
exports.useId = void 0;
var _react = _interopRequireWildcard(require("react"));
var _React$useId; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
var currentId = 0;
var getId = function getId() {
  // eslint-disable-next-line no-plusplus
  var id = currentId++;
  return ":r" + id.toString(32) + ":";
};
var useIdGrommet = function useIdGrommet() {
  var _useState = (0, _react.useState)(getId),
    id = _useState[0];
  return id;
};

// Polyfill React 18's useId for compatibility with React 16 and 17
var useId = exports.useId = (_React$useId = _react["default"].useId) != null ? _React$useId : useIdGrommet;