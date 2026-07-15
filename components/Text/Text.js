"use strict";

exports.__esModule = true;
exports.Text = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _StyledText = require("./StyledText");
var _Tip = require("../Tip");
var _utils = require("../../utils");
var _propTypes = require("./propTypes");
var _Skeleton = require("../Skeleton");
var _TextSkeleton = require("./TextSkeleton");
var _TextContext = require("./TextContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["children", "color", "tag", "as", "tip", "a11yTitle", "truncate", "size", "skeleton", "level"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Text = exports.Text = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    color = _ref.color,
    tag = _ref.tag,
    as = _ref.as,
    tipProp = _ref.tip,
    _ref$a11yTitle = _ref.a11yTitle,
    a11yTitle = _ref$a11yTitle === void 0 ? typeof tipProp === 'string' && tipProp || (tipProp == null ? void 0 : tipProp.content) || undefined : _ref$a11yTitle,
    truncate = _ref.truncate,
    size = _ref.size,
    skeletonProp = _ref.skeleton,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? 1 : _ref$level,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var textRef = (0, _utils.useForwardedRef)(ref);
  var _useState = (0, _react.useState)(false),
    textTruncated = _useState[0],
    setTextTruncated = _useState[1];
  var textContextValue = (0, _react.useMemo)(function () {
    return {
      size: size
    };
  }, [size]);
  var skeleton = (0, _Skeleton.useSkeleton)();
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    var updateTip = function updateTip() {
      setTextTruncated(false);
      if (truncate === 'tip' && textRef.current && textRef.current.scrollWidth > textRef.current.offsetWidth) {
        setTextTruncated(true);
      }
    };
    window.addEventListener('resize', updateTip);
    window.addEventListener('pagechange', updateTip);
    updateTip();
    return function () {
      window.removeEventListener('resize', updateTip);
      window.removeEventListener('pagechange', updateTip);
    };
  }, [textRef, truncate]);
  if (skeleton) {
    return /*#__PURE__*/_react["default"].createElement(_TextSkeleton.TextSkeleton, _extends({
      ref: ref,
      as: as,
      level: level,
      size: size
    }, skeletonProp, rest));
  }
  var styledTextResult = /*#__PURE__*/_react["default"].createElement(_StyledText.StyledText, _extends({
    as: !as && tag ? tag : as,
    colorProp: color,
    "aria-label": a11yTitle,
    level: level,
    truncate: truncate,
    size: size
  }, passThemeFlag, rest, {
    ref: textRef
  }), children !== undefined ? /*#__PURE__*/_react["default"].createElement(_TextContext.TextContext.Provider, {
    value: textContextValue
  }, children) : undefined);
  var tipProps = tipProp && typeof tipProp === 'object' ? tipProp : {};
  if (tipProp || textTruncated) {
    // place the text content in a tip if truncate === 'tip'
    // and the text has been truncated
    if (textTruncated) {
      return /*#__PURE__*/_react["default"].createElement(_Tip.Tip, _extends({
        content: children
      }, tipProps), styledTextResult);
    }
    // place the text content in a tip if truncate !== 'tip'
    // it displays even if the text has not truncated
    if (truncate !== 'tip') {
      return /*#__PURE__*/_react["default"].createElement(_Tip.Tip, tipProps, styledTextResult);
    }
  }
  return styledTextResult;
});
Text.displayName = 'Text';
Text.propTypes = _propTypes.TextPropTypes;