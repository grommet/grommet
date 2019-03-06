function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { StyledImage } from './StyledImage';

var Image = function Image(_ref) {
  var src = _ref.src,
      fallback = _ref.fallback,
      rest = _objectWithoutPropertiesLoose(_ref, ["src", "fallback"]);

  var _useState = useState(false),
      imageMissing = _useState[0],
      setImageMissing = _useState[1];

  return React.createElement(StyledImage, _extends({}, rest, {
    onError: function onError() {
      return setImageMissing(true);
    },
    src: !imageMissing ? src : fallback
  }));
};

var ImageDoc;

if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(Image); // eslint-disable-line global-require
}

var ImageWrapper = ImageDoc || Image;
ImageWrapper.displayName = 'Image';
export { ImageWrapper as Image };