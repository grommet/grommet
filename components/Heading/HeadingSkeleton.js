"use strict";

exports.__esModule = true;
exports.HeadingSkeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Skeleton = require("../Skeleton");
var _useThemeValue = require("../../utils/useThemeValue");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var HeadingSkeleton = exports.HeadingSkeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var as = _ref.as,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? 1 : _ref$level,
    size = _ref.size;
  var theme = (0, _useThemeValue.useThemeValue)();
  var levelStyle = theme.heading.level[level];
  var data = levelStyle == null ? void 0 : levelStyle[size || 'medium'];
  var height = data ? data.height : size;
  return /*#__PURE__*/_react["default"].createElement(_Skeleton.Skeleton, _extends({
    as: as,
    ref: ref,
    height: height
  }, theme.heading.skeleton));
});
HeadingSkeleton.displayName = 'HeadingSkeleton';