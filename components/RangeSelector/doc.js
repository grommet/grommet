"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(RangeSelector) {
  var DocumentedRangeSelector = (0, _reactDesc.describe)(RangeSelector).availableAt((0, _utils.getAvailableAtBadge)('RangeSelector')).description('A control to input a range of values.').usage("import { RangeSelector } from 'grommet';\n<RangeSelector />").intrinsicElement('div');
  DocumentedRangeSelector.propTypes = {
    color: _utils.colorPropType.description('What color to use to indicate the selection.'),
    direction: _reactDesc.PropTypes.oneOf(['horizontal', 'vertical']).description('').defaultValue('horizontal'),
    invert: _reactDesc.PropTypes.bool.description('Whether to indicate what has not been selected.'),
    max: _reactDesc.PropTypes.number.description('The maximum value permitted.').defaultValue(100),
    messages: _reactDesc.PropTypes.shape({
      lower: _reactDesc.PropTypes.string,
      upper: _reactDesc.PropTypes.string
    }).description('Custom messages used by screen readers for accessibility.'),
    min: _reactDesc.PropTypes.number.description('The minimum value permitted.').defaultValue(0),
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user changes one of the\n      values. It will be passed an array of two numbers indicating\n      the new values selected."),
    opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.string, _reactDesc.PropTypes.bool]).description('Transparency of the selection indicator.').defaultValue('medium'),
    round: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'full']), _reactDesc.PropTypes.string]).description('How much to round the corners.'),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _reactDesc.PropTypes.string]).description('How thick to make the selection indicator.').defaultValue('medium'),
    step: _reactDesc.PropTypes.number.description('The step interval between values.').defaultValue(1),
    values: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number).description('The current values.').isRequired
  };
  return DocumentedRangeSelector;
};

exports.doc = doc;
var themeDoc = {
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
exports.themeDoc = themeDoc;