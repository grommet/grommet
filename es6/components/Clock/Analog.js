var _excluded = ["elements", "precision"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { parseMetricToNum } from '../../utils';
import { defaultProps } from '../../default-props';
import { StyledAnalog, StyledHour, StyledMinute, StyledSecond } from './StyledClock'; // this will serve both minutes and hours (360 / 6)

var ANGLE_UNIT = 6; // 360 / 12

var HOUR_ANGLE_UNIT = 30;

var getClockDimensions = function getClockDimensions(theme) {
  return {
    size: parseMetricToNum(theme.clock.analog.size.medium),
    secondSize: parseMetricToNum(theme.clock.analog.second.size),
    minuteSize: parseMetricToNum(theme.clock.analog.minute.size),
    hourSize: parseMetricToNum(theme.clock.analog.hour.size)
  };
};

var getClockState = function getClockState(_ref) {
  var hours = _ref.hours,
      minutes = _ref.minutes,
      seconds = _ref.seconds;
  var hour12 = hours > 12 ? hours - 12 : hours;
  var minuteAngle = minutes * ANGLE_UNIT;
  return {
    // offset hour angle by half of the minute angle so that it gets closer
    // to the next hour
    hourAngle: hour12 * HOUR_ANGLE_UNIT + minutes / 2,
    minuteAngle: minuteAngle,
    secondAngle: seconds * ANGLE_UNIT
  };
};

var Analog = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var elements = _ref2.elements,
      precision = _ref2.precision,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useMemo = useMemo(function () {
    return getClockState(elements);
  }, [elements]),
      hourAngle = _useMemo.hourAngle,
      minuteAngle = _useMemo.minuteAngle,
      secondAngle = _useMemo.secondAngle;

  var _useMemo2 = useMemo(function () {
    return getClockDimensions(theme);
  }, [theme]),
      size = _useMemo2.size,
      secondSize = _useMemo2.secondSize,
      minuteSize = _useMemo2.minuteSize,
      hourSize = _useMemo2.hourSize;

  var halfSize = size / 2;
  var secondHand;

  if (precision === 'seconds') {
    secondHand = /*#__PURE__*/React.createElement(StyledSecond, {
      x1: halfSize,
      y1: halfSize,
      x2: halfSize,
      y2: secondSize,
      stroke: "#000000",
      strokeLinecap: theme.clock.analog.second.shape,
      style: {
        transform: "rotate(" + secondAngle + "deg)",
        transformOrigin: halfSize + "px " + halfSize + "px"
      }
    });
  }

  var minuteHand;

  if (precision === 'seconds' || precision === 'minutes') {
    minuteHand = /*#__PURE__*/React.createElement(StyledMinute, {
      x1: halfSize,
      y1: halfSize,
      x2: halfSize,
      y2: minuteSize,
      stroke: "#000000",
      strokeLinecap: theme.clock.analog.minute.shape,
      style: {
        transform: "rotate(" + minuteAngle + "deg)",
        transformOrigin: halfSize + "px " + halfSize + "px"
      }
    });
  }

  return /*#__PURE__*/React.createElement(StyledAnalog, _extends({
    ref: ref,
    version: "1.1",
    width: size,
    height: size,
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 " + size + " " + size
  }, rest), secondHand, minuteHand, /*#__PURE__*/React.createElement(StyledHour, {
    x1: halfSize,
    y1: halfSize,
    x2: halfSize,
    y2: hourSize,
    stroke: "#000000",
    strokeLinecap: theme.clock.analog.hour.shape,
    style: {
      transform: "rotate(" + hourAngle + "deg)",
      transformOrigin: halfSize + "px " + halfSize + "px"
    }
  }));
});
Analog.displayName = 'Analog';
export { Analog };