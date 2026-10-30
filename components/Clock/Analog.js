"use strict";

exports.__esModule = true;
exports.Analog = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _StyledClock = require("./StyledClock");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["elements", "precision"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
// this will serve both minutes and hours (360 / 6)
var ANGLE_UNIT = 6;
// 360 / 12
var HOUR_ANGLE_UNIT = 30;
var getClockDimensions = function getClockDimensions(theme) {
  return {
    size: (0, _utils.parseMetricToNum)(theme.clock.analog.size.medium),
    secondSize: (0, _utils.parseMetricToNum)(theme.clock.analog.second.size),
    minuteSize: (0, _utils.parseMetricToNum)(theme.clock.analog.minute.size),
    hourSize: (0, _utils.parseMetricToNum)(theme.clock.analog.hour.size)
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
var Analog = exports.Analog = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var elements = _ref2.elements,
    precision = _ref2.precision,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useMemo = (0, _react.useMemo)(function () {
      return getClockState(elements);
    }, [elements]),
    hourAngle = _useMemo.hourAngle,
    minuteAngle = _useMemo.minuteAngle,
    secondAngle = _useMemo.secondAngle;
  var _useMemo2 = (0, _react.useMemo)(function () {
      return getClockDimensions(theme);
    }, [theme]),
    size = _useMemo2.size,
    secondSize = _useMemo2.secondSize,
    minuteSize = _useMemo2.minuteSize,
    hourSize = _useMemo2.hourSize;
  var halfSize = size / 2;
  var secondHand;
  if (precision === 'seconds') {
    secondHand = /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledSecond, _extends({
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
    }, passThemeFlag));
  }
  var minuteHand;
  if (precision === 'seconds' || precision === 'minutes') {
    minuteHand = /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledMinute, _extends({
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
    }, passThemeFlag));
  }
  return /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledAnalog, _extends({
    ref: ref,
    version: "1.1",
    width: size,
    height: size,
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 " + size + " " + size
  }, passThemeFlag, rest), secondHand, minuteHand, /*#__PURE__*/_react["default"].createElement(_StyledClock.StyledHour, _extends({
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
  }, passThemeFlag)));
});
Analog.displayName = 'Analog';