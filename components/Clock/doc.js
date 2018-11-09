"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Clock) {
  var DocumentedClock = (0, _reactDesc.describe)(Clock).availableAt((0, _utils.getAvailableAtBadge)('Clock')).description('A clock with timezone awareness.').usage("import { Clock } from 'grommet';\n<Clock />");
  DocumentedClock.propTypes = _extends({}, _utils.genericProps, {
    hourLimit: _reactDesc.PropTypes.oneOf([12, 24, '12', '24']).description('Whether to roll over the hours after 12 or after 24.').defaultValue(24),
    onChange: _reactDesc.PropTypes.func.description("If the clock is running, this function will be called with the\n      current time value each time it changes."),
    precision: _reactDesc.PropTypes.oneOf(['hours', 'minutes', 'seconds']).description('How precise a time to represent.').defaultValue('seconds'),
    run: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['backward', 'forward'])]).description("Whether the clock should actively adjust time or be fixed to the\n      time specified. 'backward' could be used as a countdown timer.").defaultValue('forward'),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('Clock size').defaultValue('medium'),
    time: _reactDesc.PropTypes.string.description("ISO8601 time or duration. For example: 'PT8H12M23S',\n      'T08:12:23', or '2015-02-22T08:12:23'. Any included date\n      portion will be ignored for an analog clock. If not provided, the\n      current browser time will be used."),
    type: _reactDesc.PropTypes.oneOf(['analog', 'digital']).description('What type of visualization to show.').defaultValue('analog')
  });
  return DocumentedClock;
};

exports.doc = doc;