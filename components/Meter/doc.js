"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _propTypes = require("../../utils/prop-types");

var _mixins = require("../../utils/mixins");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Meter) {
  var DocumentedMeter = (0, _reactDesc.describe)(Meter).availableAt((0, _mixins.getAvailableAtBadge)('Meter', 'Visualizations')).description('A graphical meter.').usage("import { Meter } from 'grommet';\n<Meter />"); // We don't include svg due to a collision on the values property
  // .intrinsicElement('svg');

  DocumentedMeter.propTypes = _extends({}, _propTypes.genericProps, {
    background: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      color: _reactDesc.PropTypes.string,
      opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.number, _reactDesc.PropTypes.bool])
    })]).description('Background color').defaultValue({
      color: 'light-2',
      opacity: 'medium'
    }),
    color: _reactDesc.PropTypes.string.description("The color of the value region.\n      This is only valid when used with 'value'"),
    max: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.string]).description('The maximum value for the Meter.'),
    round: _reactDesc.PropTypes.bool.description('Whether to round the line ends').defaultValue(false),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _reactDesc.PropTypes.string]).description('The size of the Meter.').defaultValue('medium'),
    thickness: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The size of the Meter.').defaultValue('medium'),
    type: _reactDesc.PropTypes.oneOf(['bar', 'circle']).description('The visual type of meter.').defaultValue('bar'),
    value: _reactDesc.PropTypes.number.description("\n      The numeric value to represent. Ignored when 'values' is specified.\n    "),
    values: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      color: _reactDesc.PropTypes.string,
      highlight: _reactDesc.PropTypes.bool,
      label: _reactDesc.PropTypes.string.isRequired,
      // for accessibility
      onClick: _reactDesc.PropTypes.func,
      onHover: _reactDesc.PropTypes.func,
      value: _reactDesc.PropTypes.number.isRequired
    })).description("Array of value objects describing the data.\n      'value' is the actual numeric value.\n      'label' is a text string describing it.\n      'color' indicates the color name to use. If not specified a default one\n      will be chosen.\n      'onClick' will be called when the user clicks on it.\n      Set 'highlight' to call attention to it.\n      'onHover' will be called with a boolean argument indicating when the\n      user hovers onto or away from it.")
  });
  return DocumentedMeter;
};

exports.doc = doc;
var themeDoc = {
  'global.colors': {
    description: 'Color options.',
    type: 'object',
    defaultValue: "{\n      \"accent-1\": \"#6FFFB0\",\n      \"graph-0\": \"accent-1\",\n      ...\n    }"
  },
  'global.edgeSize': {
    description: "The border-radius of the styled Meter. thickness, height and \n    width of the Bar Meter, height of the Circle Meter.",
    type: 'object',
    defaultValue: "{\n        none: '0px',\n        hair: '1px',\n        xxsmall: '3px',\n        xsmall: '6px',\n        small: '12px',\n        medium: '24px',\n        large: '48px',\n        xlarge: '96px',\n        responsiveBreakpoint: 'small',\n    }"
  },
  'global.opacity.medium': {
    description: 'The opacity value used on the Meter color.',
    type: 'number',
    defaultValue: '0.4'
  },
  'global.size': {
    description: 'The possible sizes for Circle Meter width.',
    type: 'object',
    defaultValue: "{\n      xxsmall: '48px',\n      xsmall: '96px',\n      small: '192px',\n      medium: '384px',\n      large: '768px',\n      xlarge: '1152px',\n      xxlarge: '1536px',\n      full: '100%',\n    }"
  },
  'meter.color': {
    description: 'The color used for the Meter.',
    type: 'string',
    defaultValue: 'accent-1'
  },
  'meter.extend': {
    description: 'Any additional style for Meter.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;