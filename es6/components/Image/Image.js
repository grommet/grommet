var _excluded = ["a11yTitle", "fallback", "onError", "opacity", "fill", "src"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useState } from 'react';
import { StyledImage } from './StyledImage';
import { ImagePropTypes } from './propTypes';
var Image = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      fallback = _ref.fallback,
      onError = _ref.onError,
      opacity = _ref.opacity,
      fill = _ref.fill,
      src = _ref.src,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = useState(false),
      imageMissing = _useState[0],
      setImageMissing = _useState[1];

  var handleError = function handleError(event) {
    if (onError) {
      onError(event);
    }

    setImageMissing(true);
  };

  var extraProps = {
    onError: (onError || fallback) && handleError
  };
  return /*#__PURE__*/React.createElement(StyledImage, _extends({
    "aria-label": a11yTitle
  }, rest, extraProps, {
    ref: ref,
    opacityProp: opacity,
    fillProp: fill,
    src: !imageMissing ? src : fallback
  }));
});
Image.displayName = 'Image';
Image.propTypes = ImagePropTypes;
export { Image };