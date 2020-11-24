"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _propTypes = require("../../utils/prop-types");

var _mixins = require("../../utils/mixins");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Clock) {
  var DocumentedClock = (0, _reactDesc.describe)(Clock).availableAt((0, _mixins.getAvailableAtBadge)('Clock', 'Visualization')).description('A clock with timezone awareness.').usage("import { Clock } from 'grommet';\n<Clock />").intrinsicElement(['div', 'svg']);
  DocumentedClock.propTypes = _extends({}, _propTypes.genericProps, {
    hourLimit: _reactDesc.PropTypes.oneOf([12, 24, '12', '24']).description('Whether to roll over the hours after 12 or after 24.').defaultValue(24),
    onChange: _reactDesc.PropTypes.func.description("If the clock is running, this function will be called with the\n      current time value each time it changes."),
    precision: _reactDesc.PropTypes.oneOf(['hours', 'minutes', 'seconds']).description('How precise a time to represent.').defaultValue('seconds'),
    run: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['backward', 'forward'])]).description("Whether the clock should actively adjust time or be fixed to the\n      time specified. 'backward' could be used as a countdown timer.").defaultValue('forward'),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string]).description("Size for both Analog and Digital Clocks. For Analog,\n      there's also 'huge', that's equal to 'xxlarge' and exists\n      for backwards compatibility").defaultValue('medium'),
    time: _reactDesc.PropTypes.string.description("ISO8601 time or duration. For example: 'PT8H12M23S',\n      'T08:12:23', or '2015-02-22T08:12:23'. Any included date\n      portion will be ignored. If not provided, the\n      current browser time will be used."),
    type: _reactDesc.PropTypes.oneOf(['analog', 'digital']).description('What type of visualization to show.').defaultValue('analog')
  });
  return DocumentedClock;
};

exports.doc = doc;
var themeDoc = {
  'clock.analog.extend': {
    description: 'Any additional style for the Analog Clock.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'clock.analog.hour.color': {
    description: 'The color of the hour hand.',
    type: 'string | { dark: string, light: string }',
    defaultValue: '{ dark: light-2, light: dark-3 }'
  },
  'clock.analog.hour.shape': {
    description: 'The shape of the hour hand',
    type: 'string',
    defaultValue: 'round'
  },
  'clock.analog.hour.size': {
    description: 'The length of the hour hand.',
    type: 'string',
    defaultValue: '24px'
  },
  'clock.analog.hour.width': {
    description: 'The thickness of the hour hand',
    type: 'string',
    defaultValue: '8px'
  },
  'clock.analog.minute.color': {
    description: 'The color of the minute hand.',
    type: 'string | { dark: string, light: string }',
    defaultValue: '{ dark: light-4, light: dark-3 }'
  },
  'clock.analog.minute.shape': {
    description: 'The shape of the minute hand.',
    type: 'string',
    defaultValue: 'round'
  },
  'clock.analog.minute.size': {
    description: 'The length of the minute hand.',
    type: 'string',
    defaultValue: '12px'
  },
  'clock.analog.minute.width': {
    description: 'The thickness of the minute hand.',
    type: 'string',
    defaultValue: '4px'
  },
  'clock.analog.second.color': {
    description: 'The color of the seconds hand',
    type: 'string | { dark: string, light: string }',
    defaultValue: '{ dark: accent-1, light: accent-1 }'
  },
  'clock.analog.second.shape': {
    description: 'The shape of the seconds hand.',
    type: 'string',
    defaultValue: 'round'
  },
  'clock.analog.second.size': {
    description: 'The length of the seconds hand.',
    type: 'string',
    defaultValue: '10px'
  },
  'clock.analog.second.width': {
    description: 'The thickness of the seconds hand.',
    type: 'string',
    defaultValue: '3px'
  },
  'clock.analog.size.xsmall': {
    description: 'The whole size of the Analog Clock',
    type: 'string',
    defaultValue: '48px'
  },
  'clock.analog.size.small': {
    description: 'The whole size of the Analog Clock',
    type: 'string',
    defaultValue: '72px'
  },
  'clock.analog.size.medium': {
    description: 'The whole size of the Analog Clock',
    type: 'string',
    defaultValue: '96px'
  },
  'clock.analog.size.large': {
    description: 'The whole size of the Analog Clock',
    type: 'string',
    defaultValue: '144px'
  },
  'clock.analog.size.xlarge': {
    description: 'The whole size of the Analog Clock',
    type: 'string',
    defaultValue: '216px'
  },
  'clock.analog.size.xxlarge': {
    description: 'The whole size of the Analog Clock',
    type: 'string',
    defaultValue: '288px'
  },
  'clock.analog.size.huge': {
    description: 'The whole size of the Analog Clock',
    type: 'string',
    defaultValue: '288px'
  },
  'clock.digital.text.xsmall.size': {
    description: 'Defines the font size of the Digital Clock',
    type: 'string',
    defaultValue: '10px'
  },
  'clock.digital.text.xsmall.height': {
    description: 'Defines the line height of the Digital Clock',
    type: 'number',
    defaultValue: '1.5'
  },
  'clock.digital.text.small.size': {
    description: 'Defines the font size of the Digital Clock',
    type: 'string',
    defaultValue: '14px'
  },
  'clock.digital.text.small.height': {
    description: 'Defines the line height of the Digital Clock',
    type: 'number',
    defaultValue: '1.43'
  },
  'clock.digital.text.medium.size': {
    description: 'Defines the font size of the Digital Clock',
    type: 'string',
    defaultValue: '18px'
  },
  'clock.digital.text.medium.height': {
    description: 'Defines the line height of the Digital Clock',
    type: 'number',
    defaultValue: '1.375'
  },
  'clock.digital.text.large.size': {
    description: 'Defines the font size of the Digital Clock',
    type: 'string',
    defaultValue: '22px'
  },
  'clock.digital.text.large.height': {
    description: 'Defines the line height of the Digital Clock',
    type: 'number',
    defaultValue: '1.167'
  },
  'clock.digital.text.xlarge.size': {
    description: 'Defines the font size of the Digital Clock',
    type: 'string',
    defaultValue: '26px'
  },
  'clock.digital.text.xlarge.height': {
    description: 'Defines the line height of the Digital Clock',
    type: 'number',
    defaultValue: '1.1875'
  },
  'clock.digital.text.xxlarge.size': {
    description: 'Defines the font size of the Digital Clock',
    type: 'string',
    defaultValue: '34px'
  },
  'clock.digital.text.xxlarge.height': {
    description: 'Defines the line height of the Digital Clock',
    type: 'number',
    defaultValue: '1.125'
  }
};
exports.themeDoc = themeDoc;