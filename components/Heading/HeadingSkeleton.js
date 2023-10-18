"use strict";

exports.__esModule = true;
exports.HeadingSkeleton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Skeleton = require("../Skeleton");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var HeadingSkeleton = exports.HeadingSkeleton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var as = _ref.as,
    level = _ref.level,
    size = _ref.size;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || defaultProps.theme;
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
HeadingSkeleton.defaultProps = {
  level: 1
};