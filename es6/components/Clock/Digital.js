var _excluded = ["elements", "precision", "run", "size"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef, useEffect, useState } from 'react';
import { useThemeValue } from '../../utils/useThemeValue';
import { Box } from '../Box';
import { StyledDigitalDigit, StyledDigitalNext, StyledDigitalPrevious } from './StyledClock';
var Digit = function Digit(_ref) {
  var number = _ref.number,
    run = _ref.run,
    size = _ref.size;
  var _useState = useState(number),
    previous = _useState[0],
    setPrevious = _useState[1];
  var _useState2 = useState(),
    changing = _useState2[0],
    setChanging = _useState2[1];
  var _useThemeValue = useThemeValue(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  useEffect(function () {
    if (number !== previous) {
      setChanging(true);
      var timer = setTimeout(function () {
        setPrevious(number);
        setChanging(false);
      }, 900);
      return function () {
        return clearTimeout(timer);
      };
    }
    return undefined;
  }, [number, previous]);
  if (changing) {
    var direction = run === 'backward' ? 'down' : 'up';
    return /*#__PURE__*/React.createElement(StyledDigitalDigit, _extends({}, passThemeFlag, {
      size: size
    }), /*#__PURE__*/React.createElement(StyledDigitalPrevious, {
      direction: direction
    }, Math.floor(previous)), /*#__PURE__*/React.createElement(StyledDigitalNext, {
      direction: direction
    }, Math.floor(number)));
  }
  return /*#__PURE__*/React.createElement(StyledDigitalDigit, _extends({
    size: size
  }, passThemeFlag), Math.floor(number));
};
var Element = function Element(_ref2) {
  var number = _ref2.number,
    run = _ref2.run,
    sep = _ref2.sep,
    size = _ref2.size;
  var _useThemeValue2 = useThemeValue(),
    passThemeFlag = _useThemeValue2.passThemeFlag;
  var tens = Math.floor(number / 10);
  var ones = number % 10;
  var result = [/*#__PURE__*/React.createElement(Digit, {
    key: "tens",
    run: run,
    size: size,
    number: tens
  }), /*#__PURE__*/React.createElement(Digit, {
    key: "ones",
    run: run,
    size: size,
    number: ones
  })];
  if (sep) {
    result.unshift(/*#__PURE__*/React.createElement(StyledDigitalDigit, _extends({
      key: "sep",
      size: size
    }, passThemeFlag), ":"));
  }
  return result;
};
export var Digital = /*#__PURE__*/forwardRef(function (props, ref) {
  var elements = props.elements,
    precision = props.precision,
    run = props.run,
    size = props.size,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var seconds;
  if (precision === 'seconds') {
    seconds = /*#__PURE__*/React.createElement(Element, {
      number: elements.seconds,
      run: run,
      size: size,
      sep: true
    });
  }
  var minutes;
  if (precision === 'minutes' || precision === 'seconds') {
    minutes = /*#__PURE__*/React.createElement(Element, {
      number: elements.minutes,
      run: run,
      size: size,
      sep: true
    });
  }
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    direction: "row"
  }, rest), /*#__PURE__*/React.createElement(Element, {
    number: elements.hours12 || elements.hours,
    run: run,
    size: size
  }), minutes, seconds);
});