function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Clock) {
  var DocumentedClock = describe(Clock).availableAt(getAvailableAtBadge('Clock')).description('A clock with timezone awareness.').usage("import { Clock } from 'grommet';\n<Clock />").intrinsicElement(['div', 'svg']);
  DocumentedClock.propTypes = _extends({}, genericProps, {
    hourLimit: PropTypes.oneOf([12, 24, '12', '24']).description('Whether to roll over the hours after 12 or after 24.').defaultValue(24),
    onChange: PropTypes.func.description("If the clock is running, this function will be called with the\n      current time value each time it changes."),
    precision: PropTypes.oneOf(['hours', 'minutes', 'seconds']).description('How precise a time to represent.').defaultValue('seconds'),
    run: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['backward', 'forward'])]).description("Whether the clock should actively adjust time or be fixed to the\n      time specified. 'backward' could be used as a countdown timer.").defaultValue('forward'),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('Clock size').defaultValue('medium'),
    time: PropTypes.string.description("ISO8601 time or duration. For example: 'PT8H12M23S',\n      'T08:12:23', or '2015-02-22T08:12:23'. Any included date\n      portion will be ignored for an analog clock. If not provided, the\n      current browser time will be used."),
    type: PropTypes.oneOf(['analog', 'digital']).description('What type of visualization to show.').defaultValue('analog')
  });
  return DocumentedClock;
};
export var themeDoc = {
  'clock.analog.extend': {
    description: 'Any additional style for Clock.',
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
    description: 'The color of the hour minute.',
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
  'clock.analog.size.medium': {
    description: 'The whole size of the Analog clock',
    type: 'string',
    defaultValue: '96px'
  }
};