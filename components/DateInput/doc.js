"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(DateInput) {
  var DocumentedDateInput = (0, _reactDesc.describe)(DateInput).availableAt((0, _utils.getAvailableAtBadge)('DateInput', 'Input')).description('A control to input a single date or a date range.').usage("import { DateInput } from 'grommet';\n<DateInput id='item' name='item' />").intrinsicElement('div');
  DocumentedDateInput.propTypes = {
    buttonProps: _reactDesc.PropTypes.shape({}).description("Any properties to pass on to the underlying DropButton\n      when not inline and no format."),
    calendarProps: _reactDesc.PropTypes.shape({}).description('Any properties to pass on to the underlying Calendar.'),
    defaultValue: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string)]).description('The default date or date range value in ISO8601 format.'),
    dropProps: _reactDesc.PropTypes.shape({}).description('Any properties to pass on to the underlying Drop when not inline.').defaultValue({
      align: {
        top: 'bottom',
        left: 'left'
      }
    }),
    format: _reactDesc.PropTypes.string.description("The date format to use. If not specified, the date value will not\n      be displayed as a text string and the user will not be able to enter\n      a date by typing. For example: 'mm/dd/yyyy', or for a range:\n      'mm/dd/yyyy-mm/dd/yyyy'. This property should be used when in a Form."),
    id: _reactDesc.PropTypes.string.description('The id of the input.'),
    inline: _reactDesc.PropTypes.bool.description("Whether the calendar should always be shown or via a Drop when\n      interacting with the input.").defaultValue(false),
    inputProps: _reactDesc.PropTypes.shape({}).description("Any properties to pass on to the underlying MaskedInput\n      when there is a format."),
    name: _reactDesc.PropTypes.string.description("The name of the input.\n      This property is required when used within FormField."),
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user types or selects a date.\n      The updated value will be available via 'event.value'."),
    value: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string)]).description('The date or date range value(s) in ISO8601 format.')
  };
  return DocumentedDateInput;
};

exports.doc = doc;
var themeDoc = {
  'dateInput.icon.size': {
    description: "The size of the Calendar icon",
    type: 'string',
    defaultValue: '24px'
  }
};
exports.themeDoc = themeDoc;