"use strict";

exports.__esModule = true;
exports.HeadingSkeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Skeleton = require("../Skeleton");
var _useThemeValue2 = require("../../utils/useThemeValue");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var HeadingSkeleton = exports.HeadingSkeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$heading$level$;
  var as = _ref.as,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? 1 : _ref$level,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    responsive = _ref.responsive;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var height = ((_theme$heading$level$ = theme.heading.level[level]) == null || (_theme$heading$level$ = _theme$heading$level$[size]) == null ? void 0 : _theme$heading$level$.height) || size;
  var responsiveSize;
  if (responsive && theme.heading.responsiveBreakpoint) {
    var breakpoint = theme.global.breakpoints[theme.heading.responsiveBreakpoint];
    if (breakpoint) {
      var _theme$heading$level$2, _theme$heading$level$3;
      var responsiveHeight = theme.heading.level[level + 1] ? (_theme$heading$level$2 = theme.heading.level[level + 1][size]) == null ? void 0 : _theme$heading$level$2.height : (_theme$heading$level$3 = theme.heading.level[level][size]) == null ? void 0 : _theme$heading$level$3.height;
      responsiveSize = {
        breakpoint: breakpoint,
        height: responsiveHeight || height
      };
    }
  }
  return /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, _extends({
    as: as,
    ref: ref,
    height: height,
    responsive: responsive,
    responsiveSize: responsiveSize
  }, theme.heading.skeleton));
});
HeadingSkeleton.displayName = 'HeadingSkeleton';