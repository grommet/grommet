function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Meter) {
  var DocumentedMeter = describe(Meter).availableAt(getAvailableAtBadge('Meter', 'Visualizations')).description('A graphical meter.').usage("import { Meter } from 'grommet';\n<Meter />"); // We don't include svg due to a collision on the values property
  // .intrinsicElement('svg');

  DocumentedMeter.propTypes = _extends({}, genericProps, {
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      color: PropTypes.string,
      opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.number, PropTypes.bool])
    })]).description('Background color').defaultValue({
      color: 'light-2',
      opacity: 'medium'
    }),
    color: PropTypes.string.description("The color of the value region.\n      This is only valid when used with 'value'"),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).description('The maximum value for the Meter.'),
    round: PropTypes.bool.description('Whether to round the line ends').defaultValue(false),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.string]).description('The size of the Meter.').defaultValue('medium'),
    thickness: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The size of the Meter.').defaultValue('medium'),
    type: PropTypes.oneOf(['bar', 'circle']).description('The visual type of meter.').defaultValue('bar'),
    value: PropTypes.number.description("\n      The numeric value to represent. Ignored when 'values' is specified.\n    "),
    values: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      highlight: PropTypes.bool,
      label: PropTypes.string.isRequired,
      // for accessibility
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      value: PropTypes.number.isRequired
    })).description("Array of value objects describing the data.\n      'value' is the actual numeric value.\n      'label' is a text string describing it.\n      'color' indicates the color name to use. If not specified a default one\n      will be chosen.\n      'onClick' will be called when the user clicks on it.\n      Set 'highlight' to call attention to it.\n      'onHover' will be called with a boolean argument indicating when the\n      user hovers onto or away from it.")
  });
  return DocumentedMeter;
};
export var themeDoc = {
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