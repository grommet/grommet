import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge, themeDocUtils } from '../../utils';

export const doc = RangeInput => {
  const DocumentedRangeInput = describe(RangeInput)
    .availableAt(getAvailableAtBadge('RangeInput'))
    .description('A slider control to input a value within a fixed range.')
    .usage(
      `import { RangeInput } from 'grommet';
<RangeInput />`,
    )
    .intrinsicElement('input');

  DocumentedRangeInput.propTypes = {
    id: PropTypes.string.description('The id attribute of the range input.'),
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).description(
      'The minimum value permitted.',
    ),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).description(
      'The maximum value permitted.',
    ),
    name: PropTypes.string.description(
      'The name attribute of the range input.',
    ),
    onChange: PropTypes.func.description(
      `Function that will be called when the user changes the value. It will
      be passed an event object. The new input value will be available
      via 'event.target.value'.`,
    ),
    step: PropTypes.number.description('The step interval between values.'),
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).description('The current value.'),
  };

  return DocumentedRangeInput;
};

export const themeDoc = {
  ...themeDocUtils.focusStyle,
  'global.spacing': {
    description: 'The height, width and border-radius of the range thumb.',
    type: 'string',
    defaultValue: '24px',
  },
  'rangeInput.extend': {
    description: 'Any additional style for the RangeInput.',
    type: `string | (props) => \`
      any CSS styling;
    \``,
    defaultValue: undefined,
  },
  'rangeInput.thumb.color': {
    description: 'The color of the thumb.',
    type: 'string | { dark: undefined, light: undefined }',
    defaultValue: undefined,
  },
  'rangeInput.thumb.extend': {
    description: 'Any additional style for the thumb.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'rangeInput.track.color': {
    description: 'The color of the track.',
    type: 'string',
    defaultValue:
      '{ dark: rgba(255, 255, 255, 0.33), light: rgba(0, 0, 0, 0.33) }',
  },
  'rangeInput.track.extend': {
    description: 'Any additional style for the track.',
    type: `string | (props) => \`
      any CSS styling;
    \``,
    defaultValue: undefined,
  },
  'rangeInput.track.height': {
    description: 'The height of the track.',
    type: 'string',
    defaultValue: '4px',
  },
};
