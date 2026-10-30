"use strict";

exports.__esModule = true;
exports.TableHeader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _TableContext = require("../Table/TableContext");
var _StyledTable = require("../Table/StyledTable");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var TableHeader = exports.TableHeader = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  return /*#__PURE__*/_react["default"].createElement(_TableContext.TableContext.Provider, {
    value: "header"
  }, /*#__PURE__*/_react["default"].createElement(_StyledTable.StyledTableHeader, _extends({
    ref: ref
  }, props)));
});
TableHeader.displayName = 'TableHeader';