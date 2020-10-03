import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = TimeInput => {
  const DocumentedTimeInput = describe(TimeInput)
    .availableAt(getAvailableAtBadge('TimeInput'))
    .description('A control to input a single date or a date range.')
    .usage(
      `import { TimeInput } from 'grommet';
<TimeInput id='item' name='item' />`,
    )
    .intrinsicElement('div');

  DocumentedTimeInput.propTypes = {
    buttonProps: PropTypes.shape({}).description(
      `Any properties to pass on to the underlying DropButton
      when not inline and no format.`,
    ),
    clockProps: PropTypes.shape({}).description(
      'Any properties to pass on to the underlying Clock.',
    ),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).description('The default date or date range value in ISO8601 format.'),
    dropProps: PropTypes.shape({})
      .description(
        'Any properties to pass on to the underlying Drop when not inline.',
      )
      .defaultValue({ align: { top: 'bottom', left: 'left' } }),
    format: PropTypes.string.description(
      `The date format to use. If not specified, the date value will not
      be displayed as a text string and the user will not be able to enter
      a date by typing. For example: 'mm/dd/yyyy', or for a range:
      'mm/dd/yyyy-mm/dd/yyyy'. This property should be used when in a Form.`,
    ),
    id: PropTypes.string.description('The id of the input.'),
    inline: PropTypes.bool
      .description(
        `Whether the clock should always be shown or via a Drop when
      interacting with the input.`,
      )
      .defaultValue(false),
    inputProps: PropTypes.shape({}).description(
      `Any properties to pass on to the underlying MaskedInput
      when there is a format.`,
    ),
    name: PropTypes.string.description(
      `The name of the input.
      This property is required when used within FormField.`,
    ),
    onChange: PropTypes.func.description(
      `Function that will be called when the user types or selects a date.
      The updated value will be available via 'event.value'.`,
    ),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).description('The date or date range value(s) in ISO8601 format.'),
  };

  return DocumentedTimeInput;
};

export const themeDoc = {
  'TimeInput.icon.size': {
    description: `The size of the Clock icon`,
    type: 'string',
    defaultValue: '24px',
  },
};
