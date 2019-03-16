"use strict";

exports.__esModule = true;
exports.Image = void 0;

var _react = _interopRequireWildcard(require("react"));

var _StyledImage = require("./StyledImage");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Image = function Image(_ref) {
  var fallback = _ref.fallback,
      onError = _ref.onError,
      opacity = _ref.opacity,
      src = _ref.src,
      rest = _objectWithoutPropertiesLoose(_ref, ["fallback", "onError", "opacity", "src"]);

  var _useState = (0, _react.useState)(false),
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
  return _react.default.createElement(_StyledImage.StyledImage, _extends({}, rest, extraProps, {
    opacityProp: opacity,
    src: !imageMissing ? src : fallback
  }));
};

var ImageDoc;

if (process.env.NODE_ENV !== 'production') {
  ImageDoc = require('./doc').doc(Image); // eslint-disable-line global-require
}

var ImageWrapper = ImageDoc || Image;
exports.Image = ImageWrapper;
ImageWrapper.displayName = 'Image';