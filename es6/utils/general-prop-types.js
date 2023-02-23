import PropTypes from 'prop-types';
export var a11yTitlePropType = PropTypes.string;
export var alignPropType = PropTypes.oneOfType([PropTypes.oneOf(['baseline', 'center', 'end', 'start', 'stretch']), PropTypes.string]);
var ANIMATION_TYPE = PropTypes.oneOf(['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'rotateLeft', 'rotateRight', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut']);
var ANIMATION_SHAPE = PropTypes.shape({
  type: ANIMATION_TYPE,
  delay: PropTypes.number,
  duration: PropTypes.number,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
});
export var animationPropType = PropTypes.oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE, PropTypes.arrayOf(PropTypes.oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE]))]);
export var colorPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  dark: PropTypes.string,
  light: PropTypes.string
})]);
export var backgroundPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  clip: PropTypes.oneOfType([PropTypes.oneOf(['text']), PropTypes.string]),
  color: colorPropType,
  dark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  image: PropTypes.string,
  position: PropTypes.string,
  opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number, PropTypes.oneOf(['weak', 'medium', 'strong'])]),
  repeat: PropTypes.oneOfType([PropTypes.oneOf(['no-repeat', 'repeat']), PropTypes.string]),
  rotate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOfType([PropTypes.oneOf(['cover', 'contain']), PropTypes.string]),
  light: PropTypes.string
})]);
export var backgroundDoc = backgroundPropType;
export var MARGIN_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
export var marginProp = PropTypes.oneOfType([PropTypes.oneOf(['none'].concat(MARGIN_SIZES)), PropTypes.shape({
  bottom: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
  end: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
  horizontal: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
  start: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
  top: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
  vertical: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string])
}), PropTypes.string]);
var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
export var padPropType = PropTypes.oneOfType([PropTypes.oneOf(['none'].concat(PAD_SIZES)), PropTypes.shape({
  bottom: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
  end: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
  horizontal: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
  start: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
  top: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
  vertical: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string])
}), PropTypes.string]);
export var genericProps = {
  a11yTitle: a11yTitlePropType,
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
  gridArea: PropTypes.string,
  margin: marginProp
};
export var elevationPropType = PropTypes.oneOfType([PropTypes.oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]);
export var hoverIndicatorPropType = PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.oneOf(['background']), backgroundPropType, PropTypes.shape({
  background: backgroundPropType,
  elevation: elevationPropType
})]);
export var pointPropType = PropTypes.oneOf(['circle', 'diamond', 'square', 'star', 'triangle', 'triangleDown']);
export var patternPropType = PropTypes.oneOf(['squares', 'circles', 'stripesHorizontal', 'stripesVertical', 'stripesDiagonalDown', 'stripesDiagonalUp']);
export var roundPropType = PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.string, PropTypes.shape({
  corner: PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']),
  size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string])
})]);
export var skeletonColorsPropType = PropTypes.shape({
  dark: PropTypes.arrayOf(PropTypes.string),
  light: PropTypes.arrayOf(PropTypes.string)
});
export var skeletonPropType = PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
  animation: animationPropType,
  colors: skeletonColorsPropType,
  depth: PropTypes.number,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string
  })])
})]);
var dimSizeType = PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']);
export var heightPropType = PropTypes.oneOfType([dimSizeType, PropTypes.string, PropTypes.shape({
  height: PropTypes.oneOfType([dimSizeType, PropTypes.string]),
  min: PropTypes.oneOfType([dimSizeType, PropTypes.string]),
  max: PropTypes.oneOfType([dimSizeType, PropTypes.string])
})]);
export var widthPropType = PropTypes.oneOfType([dimSizeType, PropTypes.string, PropTypes.shape({
  width: PropTypes.oneOfType([dimSizeType, PropTypes.string]),
  min: PropTypes.oneOfType([dimSizeType, PropTypes.string]),
  max: PropTypes.oneOfType([dimSizeType, PropTypes.string])
})]);
export var OVERFLOW_VALUES = ['auto', 'hidden', 'scroll', 'visible'];