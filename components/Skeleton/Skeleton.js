"use strict";

exports.__esModule = true;
exports.Skeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _SkeletonContext = require("./SkeletonContext");
var _StyledSkeleton = require("./StyledSkeleton");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _contexts = require("../../contexts");
var _excluded = ["as", "colors", "width", "height", "responsive"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Skeleton = exports.Skeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$skeleton;
  var as = _ref.as,
    colorsProp = _ref.colors,
    widthProp = _ref.width,
    heightProp = _ref.height,
    responsiveProp = _ref.responsive,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var skeleton = (0, _SkeletonContext.useSkeleton)();
  var depth = (skeleton == null ? void 0 : skeleton.depth) || 0;
  var responsiveContainer = (0, _react.useContext)(_contexts.ResponsiveContainerContext);
  var responsive = responsiveContainer && responsiveProp ? 'container' : responsiveProp;
  var colors = colorsProp || (theme == null || (_theme$skeleton = theme.skeleton) == null ? void 0 : _theme$skeleton.colors);
  var themeColors = colors[theme.dark ? 'dark' : 'light'];
  var background = themeColors[(depth + 1) % themeColors.length];
  return /*#__PURE__*/_react["default"].createElement(_StyledSkeleton.StyledSkeleton
  // Skeletons are purely visual,
  // so we hide them from screen readers
  , _extends({
    "aria-hidden": "true",
    ref: ref,
    as: as,
    background: background,
    widthProp: widthProp,
    heightProp: heightProp,
    responsive: responsive
  }, passThemeFlag, rest));
});
Skeleton.displayName = 'Skeleton';
Skeleton.propTypes = _propTypes.SkeletonPropTypes;