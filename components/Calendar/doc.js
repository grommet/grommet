"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Calendar) {
  var DocumentedCalendar = (0, _reactDesc.describe)(Calendar).availableAt((0, _utils.getAvailableAtBadge)('Calendar')).description("A calendar of days displayed by month.\n      It can be used to select a single date, a range of dates, or multiple\n      individual dates.").usage("import { Calendar } from 'grommet';\n<Calendar />").intrinsicElement('div');
  DocumentedCalendar.propTypes = _extends({}, _utils.genericProps, {
    animate: _reactDesc.PropTypes.bool.description("Whether to animate the calender as the user interacts with it.").defaultValue(true),
    bounds: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string).description("An array of two numbers indicating the limits on\n        navigation in ISO8601 format"),
    date: _reactDesc.PropTypes.string.description('The selected date in ISO8601 format'),
    dates: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string)])).description("Multiple selected dates in ISO8601 format.\n      Items that are an array indicate a range of dates."),
    disabled: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string)])).description("Multiple dates in ISO8601 format that should not be\n        selectable. Items that are an array indicate a range of dates."),
    daysOfWeek: _reactDesc.PropTypes.bool.description("Whether to show the days of the week.").defaultValue(false),
    firstDayOfWeek: _reactDesc.PropTypes.oneOf([0, 1]).description('The first day of the week. 0 for Sunday. 1 for Monday.').defaultValue(0),
    header: _reactDesc.PropTypes.func.description("If specified, the entire calendar header will be managed by the caller.\nThe function passes the following options:\n\n```\n  {\n    date: Date,\n    locale: string,\n    onPreviousMonth: func,\n    onNextMonth: func,\n    previousInBound: bool,\n    nextInBound: bool,\n  }\n```\n\n`onPreviousMonth` and `onNextMonth` are callbacks that will tell the \ncalendar to move between months.\n`previousInBound` and `nextInBound` are booleans that tell, when using \n`bounds`, if the current date is within that range. You can then use that \nto disable the previous and next buttons.\n"),
    locale: _reactDesc.PropTypes.string.description('The locale to use.').defaultValue('en-US'),
    onReference: _reactDesc.PropTypes.func.description("Called with an ISO8601 date when the user navigates to a different\n       month."),
    onSelect: _reactDesc.PropTypes.func.description("Called with an ISO8601 date when\n      the user selects a day.\n      For single select, make this the subsequent `date` property value.\n      For multiple select or ranges, toggle values in `dates`.\n      Not specifying this property makes the component read only."),
    range: _reactDesc.PropTypes.bool.description("Whether to automatically manage multiple date selection as a range.\n        When the user clicks the first date, onSelect will be called with that\n        date. When the user selects another date, onSelect will be called with\n        an array of two dates.").defaultValue(false),
    reference: _reactDesc.PropTypes.string.description("The date to show if `date` isn't set, in ISO8601 format"),
    showAdjacentDays: _reactDesc.PropTypes.bool.description("Whether to show the days from the previous and next months.").defaultValue(true),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large']), _reactDesc.PropTypes.string]).description('What size to make it.').defaultValue('medium')
  });
  return DocumentedCalendar;
};

exports.doc = doc;

var themeDoc = _extends({
  'calendar.day.extend': {
    description: 'Any additional style for the day of Calendar.',
    type: 'string | (props) => {}'
  },
  'calendar.extend': {
    description: 'Any additional style for the Calendar.',
    type: 'string | (props) => {}'
  },
  'calendar.heading.level': {
    description: 'The heading level used for the calendar.',
    type: 'number',
    defaultValue: '4'
  },
  'calendar.icons.next': {
    description: 'The icon to use for the next month navigation control.',
    type: 'element',
    defaultValue: '<Next />'
  },
  'calendar.icons.previous': {
    description: 'The icon to use for the previous month navigation control.',
    type: 'element',
    defaultValue: '<Previous />'
  },
  'calendar.icons.small.next': {
    description: 'The icon to use for the next month navigation control when small.',
    type: 'element',
    defaultValue: '<FormNext />'
  },
  'calendar.icons.small.previous': {
    description: 'The icon to use for the previous month navigation control when small.',
    type: 'element',
    defaultValue: '<FormPrevious />'
  },
  'calendar.large.daySize': {
    description: 'The size of a day when large.',
    type: 'string',
    defaultValue: '109.7px'
  },
  'calendar.large.fontSize': {
    description: 'The font size to use for days when large.',
    type: 'string',
    defaultValue: '30px'
  },
  'calendar.large.lineHeight': {
    description: 'The line height to use for days when large.',
    type: 'number',
    defaultValue: 1.11
  },
  'calendar.large.slideDuration': {
    description: 'How long it animate the slide between months when large.',
    type: 'string',
    defaultValue: '0.8s'
  },
  'calendar.medium.daySize': {
    description: 'The size of a day when medium.',
    type: 'string',
    defaultValue: '54.84px'
  },
  'calendar.medium.fontSize': {
    description: 'The font size to use for days when medium.',
    type: 'string',
    defaultValue: '18px'
  },
  'calendar.medium.lineHeight': {
    description: 'The line height to use for days when medium.',
    type: 'number',
    defaultValue: 1.45
  },
  'calendar.medium.slideDuration': {
    description: 'How long it animate the slide between months when medium.',
    type: 'string',
    defaultValue: '0.5s'
  },
  'calendar.small.daySize': {
    description: 'The size of a day when small.',
    type: 'string',
    defaultValue: '27.42px'
  },
  'calendar.small.fontSize': {
    description: 'The font size to use for days when small.',
    type: 'string',
    defaultValue: '14px'
  },
  'calendar.small.lineHeight': {
    description: 'The line height to use for days when small.',
    type: 'number',
    defaultValue: 1.375
  },
  'calendar.small.slideDuration': {
    description: 'How long it animate the slide between months when small.',
    type: 'string',
    defaultValue: '0.2s'
  },
  'global.size.small': {
    description: 'The width of the calendar when small.',
    type: 'string',
    defaultValue: '192px'
  },
  'global.size.medium': {
    description: 'The width of the calendar when medium.',
    type: 'string',
    defaultValue: '384px'
  },
  'global.size.large': {
    description: 'The width of the calendar when large.',
    type: 'string',
    defaultValue: '768px'
  }
}, _utils.themeDocUtils.iconColor, _utils.themeDocUtils.edgeStyle('The possible sizes for margin.'));

exports.themeDoc = themeDoc;