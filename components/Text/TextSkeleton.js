"use strict";

exports.__esModule = true;
exports.TextSkeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Skeleton = require("../Skeleton");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["as", "size"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var TextSkeleton = exports.TextSkeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var as = _ref.as,
    sizeProp = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var size = sizeProp || 'medium';
  var data = theme.text[size];
  var height = data ? data.size : sizeProp;
  return /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, _extends({
    ref: ref,
    as: as,
    height: height
  }, theme.text.skeleton, rest));
});
TextSkeleton.displayName = 'TextSkeleton';