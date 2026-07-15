"use strict";

exports.__esModule = true;
exports.Image = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledImage = require("./StyledImage");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "fallback", "onError", "onLoad", "opacity", "fill", "src"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Image = exports.Image = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    fallback = _ref.fallback,
    onError = _ref.onError,
    onLoad = _ref.onLoad,
    opacity = _ref.opacity,
    fill = _ref.fill,
    src = _ref.src,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useState = (0, _react.useState)(false),
    isFallbackInUse = _useState[0],
    setFallbackInUse = _useState[1];
  var handleError = function handleError(event) {
    if (onError) onError(event);
    if (!isFallbackInUse && fallback && fallback !== '') {
      // eslint-disable-next-line no-param-reassign
      event.target.src = fallback;
      setFallbackInUse(true);
    }
  };
  var handleOnLoad = function handleOnLoad(event) {
    if (onLoad) onLoad(event);
    setFallbackInUse(false);
  };
  var extraProps = {
    onError: (onError || fallback) && handleError,
    onLoad: handleOnLoad
  };
  return /*#__PURE__*/_react["default"].createElement(_StyledImage.StyledImage, _extends({
    "aria-label": a11yTitle
  }, passThemeFlag, rest, extraProps, {
    ref: ref,
    opacityProp: opacity,
    fillProp: fill,
    src: src === undefined ? '' : src
  }));
});
Image.displayName = 'Image';
Image.propTypes = _propTypes.ImagePropTypes;