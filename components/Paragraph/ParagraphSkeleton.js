"use strict";

exports.__esModule = true;
exports.ParagraphSkeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Skeleton = require("../Skeleton");
var _Box = require("../Box");
var _useThemeValue2 = require("../../utils/useThemeValue");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var ParagraphSkeleton = exports.ParagraphSkeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$paragraph;
  var fill = _ref.fill,
    sizeProp = _ref.size;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var size = sizeProp || 'medium';
  var data = theme.paragraph[size];
  var height = data ? data.size : size;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: ref,
    gap: (_theme$paragraph = theme.paragraph) == null || (_theme$paragraph = _theme$paragraph.skeleton) == null ? void 0 : _theme$paragraph.gap,
    width: {
      max: fill ? 'none' : data && data.maxWidth
    }
  }, /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, {
    height: height
  }), /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, {
    height: height
  }), /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, {
    height: height,
    width: "30%"
  }));
});
ParagraphSkeleton.displayName = 'ParagraphSkeleton';