function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge, genericProps } from '../../utils';
var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var OVERFLOW_VALUES = ['auto', 'hidden', 'scroll', 'visible'];
var ANIMATION_TYPE = PropTypes.oneOf(['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut']);
var ANIMATION_SHAPE = PropTypes.shape({
  type: ANIMATION_TYPE,
  delay: PropTypes.number,
  duration: PropTypes.number,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
});
export var doc = function doc(Box) {
  var DocumentedBox = describe(Box).availableAt(getAvailableAtBadge('Box')).description('A flexible box that lays out its contents along a single direction.').usage("import { Box } from 'grommet';\n<Box />");
  DocumentedBox.propTypes = _extends({}, genericProps, {
    align: PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']).description('How to align the contents along the cross axis.'),
    alignContent: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']).description("How to align the contents when there is extra space in\n        the cross axis.").defaultValue('stretch'),
    animation: PropTypes.oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE, PropTypes.arrayOf(PropTypes.oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE]))]).description("Animation effect(s) to use. 'duration' and 'delay' should\n        be in milliseconds. 'jiggle' and 'pulse' types are intended for\n        small elements, like icons."),
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      color: PropTypes.string,
      dark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      image: PropTypes.string,
      position: PropTypes.string,
      opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool]),
      light: PropTypes.string
    })]).description("Either a color identifier to use for the background\n        color. For example: 'neutral-1'. Or, a 'url()' for an image. Dark\n        is not needed if color is provided."),
    basis: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'auto']), PropTypes.string]).description("A fixed or relative size along its container's main axis."),
    border: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'horizontal', 'vertical', 'all']), PropTypes.shape({
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        dark: PropTypes.string,
        light: PropTypes.string
      })]),
      side: PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'horizontal', 'vertical', 'all']),
      size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string])
    })]).description('Include a border.'),
    direction: PropTypes.oneOf(['row', 'column', 'row-responsive']).description('The orientation to layout the child components in.').defaultValue('column'),
    elevation: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("Elevated height above the underlying context, indicated\n        via a drop shadow.").defaultValue('none'),
    flex: PropTypes.oneOf(['grow', 'shrink', true, false]).description('Whether flex-grow and/or flex-shrink is true.'),
    fill: PropTypes.oneOf(['horizontal', 'vertical', true, false]).description('Whether the width and/or height should fill the container.'),
    gap: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("The amount of spacing between child elements. This\n        should not be used in conjunction with 'wrap' as the gap elements\n        will not wrap gracefully."),
    height: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('A fixed height.'),
    justify: PropTypes.oneOf(['start', 'center', 'between', 'end']).description('How to align the contents along the main axis.'),
    overflow: PropTypes.oneOfType([PropTypes.oneOf(OVERFLOW_VALUES), PropTypes.shape({
      horizontal: PropTypes.oneOf(OVERFLOW_VALUES),
      vertical: PropTypes.oneOf(OVERFLOW_VALUES)
    }), PropTypes.string]).description('box overflow.'),
    pad: PropTypes.oneOfType([PropTypes.oneOf(['none'].concat(PAD_SIZES)), PropTypes.shape({
      bottom: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      horizontal: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      left: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      right: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      top: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      vertical: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string])
    }), PropTypes.string]).description("The amount of padding around the box contents. An\n        object can be specified to distinguish horizontal padding, vertical\n        padding, and padding on a particular side of the box").defaultValue('none'),
    responsive: PropTypes.bool.description("Whether margin, pad, and border\n      sizes should be scaled for mobile environments.").defaultValue(true),
    round: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.string, PropTypes.shape({
      corner: PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']),
      size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string])
    })]).description('How much to round the corners.').defaultValue(false),
    tag: PropTypes.string.description('The DOM tag to use for the element.').defaultValue('div'),
    width: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('A fixed width.'),
    wrap: PropTypes.bool.description("Whether children can wrap if they\n      can't all fit.").defaultValue(false)
  });
  return DocumentedBox;
};
export var themeDoc = {
  'global.animation': {
    description: 'The animation configuration for the Box.',
    type: 'object',
    defaultValue: "{\n  duration: '1s',\n  jiggle: {\n    duration: '0.1s',\n  },\n}"
  },
  'global.borderSize': {
    description: 'The possible border sizes in the Box.',
    type: 'object',
    defaultValue: "{\n  xsmall: '1px',\n  small: '2px',\n  medium: '4px',\n  large: '12px',\n  xlarge: '24px,\n}"
  },
  'global.breakpoints': {
    description: 'The possible breakpoints that could affect border, direction, gap, margin, pad, and round.',
    type: 'object',
    defaultValue: "{\n  small: {\n    value: '768px',\n    borderSize: {\n      xsmall: '1px',\n      small: '2px',\n      medium: '4px',\n      large: '6px',\n      xlarge: '12px',\n    },\n    edgeSize: {\n      none: '0px',\n      hair: '1px',\n      xxsmall: '2px',\n      xsmall: '3px',\n      small: '6px',\n      medium: '12px',\n      large: '24px',\n      xlarge: '48px',\n    },\n    size: {\n      xxsmall: '24px',\n      xsmall: '48px',\n      small: '96px',\n      medium: '192px',\n      large: '384px',\n      xlarge: '768px',\n      full: '100%',\n    },\n  },\n  medium: {\n    value: '1536px',\n  },\n  large: {},\n}"
  },
  'global.edgeSize': {
    description: 'The possible sizes for gap, margin, and pad.',
    type: 'object',
    defaultValue: "{\n  edgeSize: {\n    none: '0px',\n    hair: '1px',\n    xxsmall: '3px',\n    xsmall: '6px',\n    small: '12px',\n    medium: '24px',\n    large: '48px',\n    xlarge: '96px',\n    responsiveBreakpoint: 'small',\n  },\n}"
  },
  'global.elevation': {
    description: 'The possible shadows in Box elevation.',
    type: 'object',
    defaultValue: "{\n  light: {\n    none: 'none',\n    xsmall: '0px 1px 2px rgba(100, 100, 100, 0.50)',\n    small: '0px 2px 4px rgba(100, 100, 100, 0.50)',\n    medium: '0px 3px 8px rgba(100, 100, 100, 0.50)',\n    large: '0px 6px 12px rgba(100, 100, 100, 0.50)',\n    xlarge: '0px 8px 16px rgba(100, 100, 100, 0.50)',\n  },\n  dark: {\n    none: 'none',\n    xsmall: '0px 2px 2px rgba(255, 255, 255, 0.40)',\n    small: '0px 4px 4px rgba(255, 255, 255, 0.40)',\n    medium: '0px 6px 8px rgba(255, 255, 255, 0.40)',\n    large: '0px 8px 16px rgba(255, 255, 255, 0.40)',\n    xlarge: '0px 10px 24px rgba(255, 255, 255, 0.40)',\n  },\n}"
  },
  'global.colors.text': {
    description: 'The text color used inside the Box.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: '#f8f8f8', light: '#444444' }"
  },
  'global.opacity.medium': {
    description: 'The value used when background opacity is set to true.',
    type: 'number',
    defaultValue: '0.4'
  },
  'global.size': {
    description: 'The possible sizes for width, height, and basis.',
    type: 'object',
    defaultValue: "{\n  xxsmall: '48px',\n  xsmall: '96px',\n  small: '192px',\n  medium: '384px',\n  large: '768px',\n  xlarge: '1152px',\n  xxlarge: '1536px',\n  full: '100%',\n}"
  },
  'box.extend': {
    description: 'Any additional style for the Box.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'box.responsiveBreakpoint': {
    description: 'The actual breakpoint to trigger changes in the border, direction, gap, margin, pad, and round.',
    type: 'string',
    defaultValue: 'small'
  }
};