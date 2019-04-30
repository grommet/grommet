import { describe, PropTypes } from 'react-desc';
import { colorPropType, getAvailableAtBadge } from '../../utils';
export var doc = function doc(RangeSelector) {
  var DocumentedRangeSelector = describe(RangeSelector).availableAt(getAvailableAtBadge('RangeSelector')).description('A control to input a range of values.').usage("import { RangeSelector } from 'grommet';\n<RangeSelector />").intrinsicElement('div');
  DocumentedRangeSelector.propTypes = {
    color: colorPropType.description('What color to use to indicate the selection.'),
    direction: PropTypes.oneOf(['horizontal', 'vertical']).description('').defaultValue('horizontal'),
    invert: PropTypes.bool.description('Whether to indicate what has not been selected.'),
    max: PropTypes.number.description('The maximum value permitted.').defaultValue(100),
    messages: PropTypes.shape({
      lower: PropTypes.string,
      upper: PropTypes.string
    }).description('Custom messages. Used for accessibility by screen readers.'),
    min: PropTypes.number.description('The minimum value permitted.').defaultValue(0),
    onChange: PropTypes.func.description("Function that will be called when the user changes one of the\n      values. It will be passed an array of two numbers indicating\n      the new values selected."),
    opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.string, PropTypes.bool]).description('Transparency of the selection indicator.').defaultValue('medium'),
    round: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'full']), PropTypes.string]).description('How much to round the corners.'),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.string]).description('How thick to make the selection indicator.').defaultValue('medium'),
    step: PropTypes.number.description('The step interval between values.').defaultValue(1),
    values: PropTypes.arrayOf(PropTypes.number).description('The current values.').isRequired
  };
  return DocumentedRangeSelector;
};
export var themeDoc = {
  'global.borderSize': {
    description: 'The size of the border.',
    type: 'string',
    defaultValue: "{\n      xsmall: '1px',\n      small: '2px',\n      medium: '4px',\n      large: '12px',\n      xlarge: '24px,\n    }"
  },
  'global.colors.border': {
    description: 'The color for the border.',
    type: 'string | { dark: string, light: string }',
    defaultValue: {
      dark: 'rgba(255, 255, 255, 0.33)',
      light: 'rgba(0, 0, 0, 0.33)'
    }
  },
  'global.colors.control': {
    description: 'The color for the edge controls.',
    type: 'string | { dark: string, light: string }',
    defaultValue: '{dark: accent-1, light: brand}'
  },
  'global.colors.focus': {
    description: 'The color of the focus.',
    type: 'string',
    defaultValue: 'accent-1'
  },
  'global.edgeSize.small': {
    description: 'The possible sizes for the margin, padding and gap.',
    type: 'string',
    defaultValue: '6px'
  },
  'rangeSelector.background.invert.color': {
    description: 'The background color on an invert display.',
    type: 'string',
    defaultValue: 'light-4'
  },
  'rangeSelector.edge.type': {
    description: 'The edge control type.',
    type: "'bar' | 'disc' | node",
    defaultValue: undefined
  },
  'global.spacing': {
    description: 'The size of the edge controls thumb.',
    type: 'string',
    defaultValue: '24px'
  }
};