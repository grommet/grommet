function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useEffect, useState } from 'react';
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
    return React.createElement(StyledDigitalDigit, {
      size: size
    }, React.createElement(StyledDigitalPrevious, {
      direction: direction
    }, Math.floor(previous)), React.createElement(StyledDigitalNext, {
      direction: direction
    }, Math.floor(number)));
  }

  return React.createElement(StyledDigitalDigit, {
    size: size
  }, Math.floor(number));
};

var Element = function Element(_ref2) {
  var number = _ref2.number,
      run = _ref2.run,
      sep = _ref2.sep,
      size = _ref2.size;
  var tens = Math.floor(number / 10);
  var ones = number % 10;
  var result = [React.createElement(Digit, {
    key: "tens",
    run: run,
    size: size,
    number: tens
  }), React.createElement(Digit, {
    key: "ones",
    run: run,
    size: size,
    number: ones
  })];

  if (sep) {
    result.unshift(React.createElement(StyledDigitalDigit, {
      key: "sep",
      size: size
    }, ":"));
  }

  return result;
};

export var Digital = forwardRef(function (props, ref) {
  var elements = props.elements,
      precision = props.precision,
      run = props.run,
      size = props.size,
      rest = _objectWithoutPropertiesLoose(props, ["elements", "precision", "run", "size"]);

  var seconds;

  if (precision === 'seconds') {
    seconds = React.createElement(Element, {
      number: elements.seconds,
      run: run,
      size: size,
      sep: true
    });
  }

  var minutes;

  if (precision === 'minutes' || precision === 'seconds') {
    minutes = React.createElement(Element, {
      number: elements.minutes,
      run: run,
      size: size,
      sep: true
    });
  }

  return React.createElement(Box, _extends({
    ref: ref,
    direction: "row"
  }, rest), React.createElement(Element, {
    number: elements.hours12 || elements.hours,
    run: run,
    size: size
  }), minutes, seconds);
});