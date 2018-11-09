"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Calendar) {
  var DocumentedCalendar = (0, _reactDesc.describe)(Calendar).availableAt((0, _utils.getAvailableAtBadge)('Calendar')).description("Calendar of days in months.\n      It can be used to select a single date, a range of dates, or multiple\n      individual dates.").usage("import { Calendar } from 'grommet';\n<Calendar />");
  DocumentedCalendar.propTypes = _extends({}, _utils.genericProps, {
    animate: _reactDesc.PropTypes.bool.description("\n      Whether to animate the calender as the user interacts with it.\n    ").defaultValue(true),
    bounds: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string).description("An array of two numbers indicating the limits on\n        navigation in ISO8601 format"),
    date: _reactDesc.PropTypes.string.description('The selected date in ISO8601 format'),
    dates: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string)])).description("Multiple selected dates in ISO8601 format.\n      Items that are an array indicate a range of dates."),
    disabled: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string)])).description("Multiple dates in ISO8601 format that should not be\n        selectable. Items that are an array indicate a range of dates."),
    firstDayOfWeek: _reactDesc.PropTypes.oneOf([0, 1]).description('The first day of the week. 0 for Sunday. 1 for Monday.').defaultValue(0),
    header: _reactDesc.PropTypes.func.description("If specified, the entire calendar header will be managed by the caller.\nThe function passes the following options:\n\n```\n  {\n    date: Date,\n    locale: string,\n    onPreviousMonth: func,\n    onNextMonth: func,\n    previousInBound: bool,\n    nextInBound: bool,\n  }\n```\n\n`onPreviousMonth` and `onNextMonth` are callbacks that will tell the calendar to move between months.\n`previousInBound` and `nextInBound` are booleans that tell, when using `bounds`, if the current date is within that range.\nYou can then use that to disable the previous and next buttons.\n"),
    locale: _reactDesc.PropTypes.string.description('The locale to use.').defaultValue('en-US'),
    onReference: _reactDesc.PropTypes.func.description("\n      Called with an ISO8601 date when the user navigates to a different month.\n    "),
    onSelect: _reactDesc.PropTypes.func.description("Called with an ISO8601 date when\n      the user selects a day.\n      For single select, make this the subsequent `date` property value.\n      For multiple select or ranges, toggle values in `dates`.\n      Not specifying this property makes the component read only."),
    range: _reactDesc.PropTypes.bool.description("\n      Whether to automatically manage multiple date selection as a range.\n      When the user clicks the first date, onSelect will be called with that\n      date. When the user selects another date, onSelect will be called with\n      an array of two dates.\n    ").defaultValue(false),
    reference: _reactDesc.PropTypes.string.description("The date to show if `date` isn't set, in ISO8601 format"),
    showAdjacentDays: _reactDesc.PropTypes.bool.description("\n      Whether to show the days from the previous and next months.\n    ").defaultValue(true),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large']), _reactDesc.PropTypes.string]).description('What size to make it.').defaultValue('medium')
  });
  return DocumentedCalendar;
};

exports.doc = doc;