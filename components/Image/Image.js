"use strict";

exports.__esModule = true;
exports.Image = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledImage = require("./StyledImage");
var _propTypes = require("./propTypes");
var _excluded = ["a11yTitle", "fallback", "onError", "onLoad", "opacity", "fill", "src"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Image = exports.Image = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    fallback = _ref.fallback,
    onError = _ref.onError,
    onLoad = _ref.onLoad,
    opacity = _ref.opacity,
    fill = _ref.fill,
    src = _ref.src,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
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
  }, rest, extraProps, {
    ref: ref,
    opacityProp: opacity,
    fillProp: fill,
    src: src === undefined ? '' : src
  }));
});
Image.displayName = 'Image';
Image.propTypes = _propTypes.ImagePropTypes;