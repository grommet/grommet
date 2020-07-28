"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = exports.OVERFLOW_VALUES = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var OVERFLOW_VALUES = ['auto', 'hidden', 'scroll', 'visible'];
exports.OVERFLOW_VALUES = OVERFLOW_VALUES;

var ANIMATION_TYPE = _reactDesc.PropTypes.oneOf(['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'rotateLeft', 'rotateRight', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut']);

var ANIMATION_SHAPE = _reactDesc.PropTypes.shape({
  type: ANIMATION_TYPE,
  delay: _reactDesc.PropTypes.number,
  duration: _reactDesc.PropTypes.number,
  size: _reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
});

var BORDER_SHAPE = _reactDesc.PropTypes.shape({
  color: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
    dark: _reactDesc.PropTypes.string,
    light: _reactDesc.PropTypes.string
  })]),
  side: _reactDesc.PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']),
  size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]),
  style: _reactDesc.PropTypes.oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden']).defaultValue('solid')
}); // if you update values here, make sure to update in Drop/doc too.


var overflowPropType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(OVERFLOW_VALUES), _reactDesc.PropTypes.shape({
  horizontal: _reactDesc.PropTypes.oneOf(OVERFLOW_VALUES),
  vertical: _reactDesc.PropTypes.oneOf(OVERFLOW_VALUES)
}), _reactDesc.PropTypes.string]);

var doc = function doc(Box) {
  var DocumentedBox = (0, _reactDesc.describe)(Box).availableAt((0, _utils.getAvailableAtBadge)('Box')).description("A container that lays out its contents in one direction. Box\n      provides CSS flexbox capabilities for layout, as well as general\n      styling of things like background color, border, and animation.").usage("import { Box } from 'grommet';\n<Box />").intrinsicElement('div');
  DocumentedBox.propTypes = _extends({}, _utils.genericProps, {
    align: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']).description('How to align the contents along the cross axis.'),
    alignContent: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']).description("How to align the contents when there is extra space in\n        the cross axis.").defaultValue('stretch'),
    animation: _reactDesc.PropTypes.oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE]))]).description("Animation effect(s) to use. 'duration' and 'delay' should\n        be in milliseconds. 'jiggle' and 'pulse' types are intended for\n        small elements, like icons."),
    background: _utils.backgroundDoc,
    basis: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'auto']), _reactDesc.PropTypes.string]).description("A fixed or relative size along its container's main axis."),
    border: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']), BORDER_SHAPE, _reactDesc.PropTypes.arrayOf(BORDER_SHAPE)]).description("Include a border. 'between' will place a border in the gap between\n      child elements. You must have a 'gap' to use 'between'."),
    direction: _reactDesc.PropTypes.oneOf(['row', 'column', 'row-responsive', 'row-reverse', 'column-reverse']).description('The orientation to layout the child components in.').defaultValue('column'),
    elevation: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("Elevated height above the underlying context, indicated\n        via a drop shadow.").defaultValue('none'),
    flex: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['grow', 'shrink']), _reactDesc.PropTypes.bool, _reactDesc.PropTypes.shape({
      grow: _reactDesc.PropTypes.number,
      shrink: _reactDesc.PropTypes.number
    })]).description('Whether flex-grow and/or flex-shrink is true and at a desired factor.'),
    fill: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['horizontal', 'vertical']), _reactDesc.PropTypes.bool]).description('Whether the width and/or height should fill the container.'),
    focusIndicator: _reactDesc.PropTypes.bool.description("When interactive via 'onClick', whether it should receive a focus\n        outline.").defaultValue(true),
    gap: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("The amount of spacing between child elements. This\n        should not be used in conjunction with 'wrap' as the gap elements\n        will not wrap gracefully. If a child is a Fragment,\n        Box will not add a gap between the choldren of the Fragment."),
    height: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      min: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string]),
      max: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string])
    })]).description('A fixed height.'),
    hoverIndicator: _utils.hoverIndicatorPropType.description("When 'onClick' has been specified, the hover indicator to apply\n        when the user is mousing over the box.").defaultValue(false),
    justify: _reactDesc.PropTypes.oneOf(['around', 'between', 'center', 'end', 'evenly', 'start', 'stretch']).description('How to align the contents along the main axis.').defaultValue('stretch'),
    onClick: _reactDesc.PropTypes.func.description("Click handler. Setting this property adds additional attributes to\n      the DOM for accessibility."),
    overflow: overflowPropType.description('box overflow.'),
    pad: _utils.padPropType,
    responsive: _reactDesc.PropTypes.bool.description("Whether margin, pad, and border\n      sizes should be scaled for mobile environments.").defaultValue(true),
    round: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      corner: _reactDesc.PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right']),
      size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string])
    })]).description('How much to round the corners.').defaultValue(false),
    tag: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.func]).description("The DOM tag to use for the element. NOTE: This is deprecated in favor\nof indicating the DOM tag via the 'as' property."),
    as: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.func]).description('The DOM tag or react component to use for the element.').defaultValue('div'),
    width: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      min: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string]),
      max: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string])
    })]).description('A fixed width.'),
    wrap: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['reverse'])]).description("Whether children can wrap if they can't all fit.").defaultValue(false)
  });
  return DocumentedBox;
};

exports.doc = doc;

var themeDoc = _extends({
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
  'global.elevation': {
    description: 'The possible shadows in Box elevation.',
    type: 'object',
    defaultValue: "{\n  light: {\n    none: 'none',\n    xsmall: '0px 1px 2px rgba(100, 100, 100, 0.50)',\n    small: '0px 2px 4px rgba(100, 100, 100, 0.50)',\n    medium: '0px 3px 8px rgba(100, 100, 100, 0.50)',\n    large: '0px 6px 12px rgba(100, 100, 100, 0.50)',\n    xlarge: '0px 8px 16px rgba(100, 100, 100, 0.50)',\n  },\n  dark: {\n    none: 'none',\n    xsmall: '0px 2px 2px rgba(255, 255, 255, 0.40)',\n    small: '0px 4px 4px rgba(255, 255, 255, 0.40)',\n    medium: '0px 6px 8px rgba(255, 255, 255, 0.40)',\n    large: '0px 8px 16px rgba(255, 255, 255, 0.40)',\n    xlarge: '0px 10px 24px rgba(255, 255, 255, 0.40)',\n  },\n}"
  },
  'global.colors.border': {
    description: 'The color of the border',
    type: 'string | { dark: string, light: string }',
    defaultValue: '{ dark: rgba(255, 255, 255, 0.33), light: rgba(0, 0, 0, 0.33), }'
  },
  'global.hover.background.color': {
    description: 'The color of the default background when hovering',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'active'
  },
  'global.hover.background.opacity': {
    description: 'The opacity of the default background when hovering',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'medium'
  },
  'global.hover.color': {
    description: 'The color of the default background when hovering',
    type: 'string | { dark: string, light: string }',
    defaultValue: '{ dark: "white", light: "black" }'
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
    description: "The actual breakpoint to trigger changes in the border, \n    direction, gap, margin, pad, and round.",
    type: 'string',
    defaultValue: 'small'
  }
}, _utils.themeDocUtils.edgeStyle('The possible sizes for any of gap, margin, and pad.'), _utils.themeDocUtils.breakpointStyle("The possible breakpoints that could affect border, direction, gap, margin, \n    pad, and round."));

exports.themeDoc = themeDoc;