"use strict";

exports.__esModule = true;
exports.ParagraphSkeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Skeleton = require("../Skeleton");
var _Box = require("../Box");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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