import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(DateInput) {
  var DocumentedDateInput = describe(DateInput).availableAt(getAvailableAtBadge('DateInput', 'Input')).description('A control to input a single date or a date range.').usage("import { DateInput } from 'grommet';\n<DateInput id='item' name='item' />").intrinsicElement('div');
  DocumentedDateInput.propTypes = {
    buttonProps: PropTypes.shape({}).description("Any properties to pass on to the underlying DropButton\n      when not inline and no format."),
    calendarProps: PropTypes.shape({}).description('Any properties to pass on to the underlying Calendar.'),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).description('The default date or date range value in ISO8601 format.'),
    dropProps: PropTypes.shape({}).description('Any properties to pass on to the underlying Drop when not inline.').defaultValue({
      align: {
        top: 'bottom',
        left: 'left'
      }
    }),
    format: PropTypes.string.description("The date format to use. If not specified, the date value will not\n      be displayed as a text string and the user will not be able to enter\n      a date by typing. For example: 'mm/dd/yyyy', or for a range:\n      'mm/dd/yyyy-mm/dd/yyyy'. This property should be used when in a Form."),
    id: PropTypes.string.description('The id of the input.'),
    inline: PropTypes.bool.description("Whether the calendar should always be shown or via a Drop when\n      interacting with the input.").defaultValue(false),
    inputProps: PropTypes.shape({}).description("Any properties to pass on to the underlying MaskedInput\n      when there is a format."),
    name: PropTypes.string.description("The name of the input.\n      This property is required when used within FormField."),
    onChange: PropTypes.func.description("Function that will be called when the user types or selects a date.\n      The updated value will be available via 'event.value'."),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).description('The date or date range value(s) in ISO8601 format.')
  };
  return DocumentedDateInput;
};
export var themeDoc = {
  'dateInput.icon.size': {
    description: "The size of the Calendar icon",
    type: 'string',
    defaultValue: '24px'
  }
};