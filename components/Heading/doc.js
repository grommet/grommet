"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Heading) {
  var DocumentedHeading = (0, _reactDesc.describe)(Heading).availableAt((0, _utils.getAvailableAtBadge)('Heading')).description('Heading text structed in levels.').usage("import { Heading } from 'grommet';\n<Heading />").intrinsicElement(['h1', 'h2', 'h3', 'h4']);
  DocumentedHeading.propTypes = _extends({}, _utils.genericProps, {
    color: _utils.colorPropType.description('A color identifier to use for the text color.'),
    level: _reactDesc.PropTypes.oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']).description("The heading level. It corresponds to the number after the 'H' for\nthe DOM tag. Set the level for semantic accuracy and accessibility.\nThe sizing can be further adjusted using the size property.").defaultValue(1),
    responsive: _reactDesc.PropTypes.bool.description("Whether the font size should be scaled for\n      mobile environments.").defaultValue(true),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("The font size is primarily driven by the chosen tag. But, it can\nbe adjusted via this size property. The tag should be set for semantic\ncorrectness and accessibility. This size property allows for stylistic\nadjustments.").defaultValue('medium'),
    textAlign: _reactDesc.PropTypes.oneOf(['start', 'center', 'end']).description('How to align the text inside the heading.').defaultValue('start'),
    truncate: _reactDesc.PropTypes.bool.description("Restrict the text to a single line and truncate with ellipsis if it\nis too long to all fit.").defaultValue(false)
  });
  return DocumentedHeading;
};

exports.doc = doc;

var themeDoc = _extends({}, _utils.themeDocUtils.breakpointStyle('The possible breakpoints that could affect font-size and max-width'), _utils.themeDocUtils.edgeStyle('The possible sizes for margin.'), {
  'heading.extend': {
    description: 'Any additional style for Heading.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'heading.level': {
    description: 'The level that impacts line height, max width, font size, weight and family of the Heading.',
    type: 'object',
    defaultValue: "\n      1: {\n        medium: {\n          size: 34px,\n          height: 40px,\n          width: 826px,\n        },\n      },\n      weight: 600,\n      font:\n        {\n          family: undefined,\n        }"
  },
  'heading.weight': {
    description: 'Default heading weight used unless a per level heading is defined.',
    type: 'number',
    defaultValue: 600
  },
  'heading.font': {
    description: 'Default heading font used unless a per level heading is defined.',
    type: 'object',
    defaultValue: undefined
  },
  'heading.responsiveBreakpoint': {
    description: 'The breakpoint to trigger changes in the Heading layout. The actual values will be derived from global.breakpoints.',
    type: 'string',
    defaultValue: 'small'
  }
});

exports.themeDoc = themeDoc;