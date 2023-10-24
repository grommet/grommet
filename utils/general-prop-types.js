"use strict";

exports.__esModule = true;
exports.widthPropType = exports.skeletonPropType = exports.skeletonColorsPropType = exports.roundPropType = exports.pointPropType = exports.patternPropType = exports.padPropType = exports.marginProp = exports.hoverIndicatorPropType = exports.heightPropType = exports.genericProps = exports.elevationPropType = exports.colorPropType = exports.backgroundPropType = exports.backgroundDoc = exports.animationPropType = exports.alignPropType = exports.a11yTitlePropType = exports.OVERFLOW_VALUES = exports.MARGIN_SIZES = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var a11yTitlePropType = exports.a11yTitlePropType = _propTypes["default"].string;
var alignPropType = exports.alignPropType = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['baseline', 'center', 'end', 'start', 'stretch']), _propTypes["default"].string]);
var ANIMATION_TYPE = _propTypes["default"].oneOf(['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'rotateLeft', 'rotateRight', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut']);
var ANIMATION_SHAPE = _propTypes["default"].shape({
  type: ANIMATION_TYPE,
  delay: _propTypes["default"].number,
  duration: _propTypes["default"].number,
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
});
var animationPropType = exports.animationPropType = _propTypes["default"].oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE]))]);
var colorPropType = exports.colorPropType = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
  dark: _propTypes["default"].string,
  light: _propTypes["default"].string
})]);
var backgroundPropType = exports.backgroundPropType = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
  clip: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['text']), _propTypes["default"].string]),
  color: colorPropType,
  dark: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
  image: _propTypes["default"].string,
  position: _propTypes["default"].string,
  opacity: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool, _propTypes["default"].number, _propTypes["default"].oneOf(['weak', 'medium', 'strong'])]),
  repeat: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['no-repeat', 'repeat']), _propTypes["default"].string]),
  rotate: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['cover', 'contain']), _propTypes["default"].string]),
  light: _propTypes["default"].string
})]);
var backgroundDoc = exports.backgroundDoc = backgroundPropType;
var MARGIN_SIZES = exports.MARGIN_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var marginProp = exports.marginProp = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none'].concat(MARGIN_SIZES)), _propTypes["default"].shape({
  bottom: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(MARGIN_SIZES), _propTypes["default"].string]),
  end: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(MARGIN_SIZES), _propTypes["default"].string]),
  horizontal: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(MARGIN_SIZES), _propTypes["default"].string]),
  left: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(MARGIN_SIZES), _propTypes["default"].string]),
  right: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(MARGIN_SIZES), _propTypes["default"].string]),
  start: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(MARGIN_SIZES), _propTypes["default"].string]),
  top: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(MARGIN_SIZES), _propTypes["default"].string]),
  vertical: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(MARGIN_SIZES), _propTypes["default"].string])
}), _propTypes["default"].string]);
var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var padPropType = exports.padPropType = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none'].concat(PAD_SIZES)), _propTypes["default"].shape({
  bottom: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
  end: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
  horizontal: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
  left: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
  right: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
  start: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
  top: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string]),
  vertical: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(PAD_SIZES), _propTypes["default"].string])
}), _propTypes["default"].string]);
var genericProps = exports.genericProps = {
  a11yTitle: a11yTitlePropType,
  alignSelf: _propTypes["default"].oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
  gridArea: _propTypes["default"].string,
  margin: marginProp
};
var elevationPropType = exports.elevationPropType = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]);
var hoverIndicatorPropType = exports.hoverIndicatorPropType = _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string, _propTypes["default"].oneOf(['background']), backgroundPropType, _propTypes["default"].shape({
  background: backgroundPropType,
  elevation: elevationPropType
})]);
var pointPropType = exports.pointPropType = _propTypes["default"].oneOf(['circle', 'diamond', 'square', 'star', 'triangle', 'triangleDown']);
var patternPropType = exports.patternPropType = _propTypes["default"].oneOf(['squares', 'circles', 'stripesHorizontal', 'stripesVertical', 'stripesDiagonalDown', 'stripesDiagonalUp']);
var roundPropType = exports.roundPropType = _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _propTypes["default"].string, _propTypes["default"].shape({
  corner: _propTypes["default"].oneOf(['top', 'left', 'bottom', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']),
  size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string])
})]);
var skeletonColorsPropType = exports.skeletonColorsPropType = _propTypes["default"].shape({
  dark: _propTypes["default"].arrayOf(_propTypes["default"].string),
  light: _propTypes["default"].arrayOf(_propTypes["default"].string)
});
var skeletonPropType = exports.skeletonPropType = _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
  animation: animationPropType,
  colors: skeletonColorsPropType,
  depth: _propTypes["default"].number,
  message: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
    start: _propTypes["default"].string,
    end: _propTypes["default"].string
  })])
})]);
var dimSizeType = _propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']);
var heightPropType = exports.heightPropType = _propTypes["default"].oneOfType([dimSizeType, _propTypes["default"].string, _propTypes["default"].shape({
  height: _propTypes["default"].oneOfType([dimSizeType, _propTypes["default"].string]),
  min: _propTypes["default"].oneOfType([dimSizeType, _propTypes["default"].string]),
  max: _propTypes["default"].oneOfType([dimSizeType, _propTypes["default"].string])
})]);
var widthPropType = exports.widthPropType = _propTypes["default"].oneOfType([dimSizeType, _propTypes["default"].string, _propTypes["default"].shape({
  width: _propTypes["default"].oneOfType([dimSizeType, _propTypes["default"].string]),
  min: _propTypes["default"].oneOfType([dimSizeType, _propTypes["default"].string]),
  max: _propTypes["default"].oneOfType([dimSizeType, _propTypes["default"].string])
})]);
var OVERFLOW_VALUES = exports.OVERFLOW_VALUES = ['auto', 'hidden', 'scroll', 'visible'];