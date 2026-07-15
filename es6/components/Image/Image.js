var _excluded = ["a11yTitle", "fallback", "onError", "onLoad", "opacity", "fill", "src"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useState } from 'react';
import { StyledImage } from './StyledImage';
import { ImagePropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var Image = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    fallback = _ref.fallback,
    onError = _ref.onError,
    onLoad = _ref.onLoad,
    opacity = _ref.opacity,
    fill = _ref.fill,
    src = _ref.src,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useState = useState(false),
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
  return /*#__PURE__*/React.createElement(StyledImage, _extends({
    "aria-label": a11yTitle
  }, passThemeFlag, rest, extraProps, {
    ref: ref,
    opacityProp: opacity,
    fillProp: fill,
    src: src === undefined ? '' : src
  }));
});
Image.displayName = 'Image';
Image.propTypes = ImagePropTypes;
export { Image };