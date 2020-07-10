function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge, themeDocUtils } from '../../utils';
export var doc = function doc(RangeInput) {
  var DocumentedRangeInput = describe(RangeInput).availableAt(getAvailableAtBadge('RangeInput')).description('A slider control to input a value within a fixed range.').usage("import { RangeInput } from 'grommet';\n<RangeInput />").intrinsicElement('input');
  DocumentedRangeInput.propTypes = {
    a11yTitle: PropTypes.string.description("Custom label to be used by screen readers.\n      When provided, an aria-label will be added to the element."),
    id: PropTypes.string.description('The id attribute of the range input.'),
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).description('The minimum value permitted.'),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).description('The maximum value permitted.'),
    name: PropTypes.string.description('The name attribute of the range input.'),
    onChange: PropTypes.func.description("Function that will be called when the user changes the value. It will\n      be passed an event object. The new input value will be available\n      via 'event.target.value'."),
    step: PropTypes.number.description('The step interval between values.'),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).description('The current value.')
  };
  return DocumentedRangeInput;
};
export var themeDoc = _extends({}, themeDocUtils.focusStyle, {
  'global.colors.border': {
    description: 'The color used for rangeInput.track.color.',
    type: 'string | { dark: string, light: string }',
    defaultValue: '{ dark: rgba(255, 255, 255, 0.33), light: rgba(0, 0, 0, 0.33) }'
  },
  'global.spacing': {
    description: 'The height, width and border-radius of the range thumb.',
    type: 'string',
    defaultValue: '24px'
  },
  'rangeInput.extend': {
    description: 'Any additional style for the RangeInput.',
    type: "string | (props) => `\n      any CSS styling;\n    `",
    defaultValue: undefined
  },
  'rangeInput.thumb.color': {
    description: 'The color of the thumb.',
    type: 'string | { dark: undefined, light: undefined }',
    defaultValue: undefined
  },
  'rangeInput.thumb.extend': {
    description: 'Any additional style for the thumb.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'rangeInput.track.color': {
    description: 'The color of the track.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'border'
  },
  'rangeInput.track.opacity': {
    description: 'The opacity of the track color.',
    type: 'string | number',
    defaultValue: undefined
  },
  'rangeInput.track.lower.color': {
    description: 'The color of the lower bound track.',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'rangeInput.track.lower.opacity': {
    description: 'The opacity on the lower bound track color.',
    type: 'string | number',
    defaultValue: undefined
  },
  'rangeInput.track.upper.color': {
    description: 'The color of the upper track.',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'rangeInput.track.upper.opacity': {
    description: 'The opacity on the upper track color.',
    type: 'string | number',
    defaultValue: undefined
  },
  'rangeInput.track.extend': {
    description: 'Any additional style for the track.',
    type: "string | (props) => `\n      any CSS styling;\n    `",
    defaultValue: undefined
  },
  'rangeInput.track.height': {
    description: 'The height of the track.',
    type: 'string',
    defaultValue: '4px'
  }
});