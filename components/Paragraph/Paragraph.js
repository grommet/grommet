"use strict";

exports.__esModule = true;
exports.Paragraph = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledParagraph = require("./StyledParagraph");
var _propTypes = require("./propTypes");
var _Skeleton = require("../Skeleton");
var _ParagraphSkeleton = require("./ParagraphSkeleton");
var _TextContext = require("../Text/TextContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["children", "color", "fill", "size"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Paragraph = exports.Paragraph = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    color = _ref.color,
    fill = _ref.fill,
    size = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var skeleton = (0, _Skeleton.useSkeleton)();
  var textContextValue = (0, _react.useMemo)(function () {
    return {
      size: size
    };
  }, [size]);
  if (skeleton) {
    return /*#__PURE__*/_react["default"].createElement(_ParagraphSkeleton.ParagraphSkeleton, _extends({
      ref: ref,
      fill: fill,
      size: size
    }, rest), children);
  }
  return /*#__PURE__*/_react["default"].createElement(_StyledParagraph.StyledParagraph, _extends({
    ref: ref,
    colorProp: color,
    fillProp: fill,
    size: size
  }, passThemeFlag, rest), children !== undefined ? /*#__PURE__*/_react["default"].createElement(_TextContext.TextContext.Provider, {
    value: textContextValue
  }, children) : undefined);
});
Paragraph.displayName = 'Paragraph';
Paragraph.prototype = _propTypes.ParagraphPropTypes;