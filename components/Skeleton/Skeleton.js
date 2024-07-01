"use strict";

exports.__esModule = true;
exports.Skeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _SkeletonContext = require("./SkeletonContext");
var _StyledSkeleton = require("./StyledSkeleton");
var _useThemeValue = require("../../utils/useThemeValue");
var _excluded = ["as", "colors", "width", "height"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var Skeleton = exports.Skeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$skeleton;
  var as = _ref.as,
    colorsProp = _ref.colors,
    widthProp = _ref.width,
    heightProp = _ref.height,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = (0, _useThemeValue.useThemeValue)();
  var skeleton = (0, _SkeletonContext.useSkeleton)();
  var depth = (skeleton == null ? void 0 : skeleton.depth) || 0;
  var colors = colorsProp || (theme == null || (_theme$skeleton = theme.skeleton) == null ? void 0 : _theme$skeleton.colors);
  var themeColors = colors[theme.dark ? 'dark' : 'light'];
  var background = themeColors[(depth + 1) % themeColors.length];
  return /*#__PURE__*/_react["default"].createElement(_StyledSkeleton.StyledSkeleton, _extends({
    ref: ref,
    as: as,
    background: background,
    widthProp: widthProp,
    heightProp: heightProp
  }, rest));
});
Skeleton.displayName = 'Skeleton';
Skeleton.propTypes = _propTypes.SkeletonPropTypes;