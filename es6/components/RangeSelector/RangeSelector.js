var _excluded = ["color", "defaultValues", "direction", "invert", "label", "max", "messages", "min", "name", "onChange", "opacity", "round", "size", "step", "values"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { Box } from '../Box';
import { EdgeControl } from './EdgeControl';
import { FormContext } from '../Form/FormContext';
import { Text } from '../Text';
import { parseMetricToNum } from '../../utils';
import { MessageContext } from '../../contexts/MessageContext';
import { RangeSelectorPropTypes } from './propTypes';
import { DataFormContext } from '../../contexts/DataFormContext';
import { useThemeValue } from '../../utils/useThemeValue';
var Container = styled(Box).withConfig({
  displayName: "RangeSelector__Container",
  componentId: "sc-siof5p-0"
})(["user-select:none;"]);
export var getDecimalCount = function getDecimalCount(number) {
  if (Number.isInteger(number)) {
    return 0;
  }
  // handle small numbers (0.00000001) which javascript
  // will turn into `e-`
  if (Math.abs(number) < 1) {
    var parts = number.toExponential().split('e-');
    var _decimalPart = parts[0].split('.')[1] || '';
    return _decimalPart.length + parseInt(parts[1], 10);
  }
  var decimalPart = number.toString().split('.')[1] || '';
  return decimalPart.length;
};

// avoid floating point issues like 0.15 + 0.3 = 0.44999999999999996
// and turn into 0.15 + 0.3 = 0.45
export var valueToStepPrecision = function valueToStepPrecision(value, step, min) {
  var nearestTrueStep = Math.round((value - min) / step) * step + min;
  return Number(nearestTrueStep.toFixed(getDecimalCount(step)));
};

// ensure values are within min/max
var clamp = function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
};
var RangeSelector = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var color = _ref.color,
    _ref$defaultValues = _ref.defaultValues,
    defaultValues = _ref$defaultValues === void 0 ? [] : _ref$defaultValues,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    invert = _ref.invert,
    label = _ref.label,
    _ref$max = _ref.max,
    max = _ref$max === void 0 ? 100 : _ref$max,
    messages = _ref.messages,
    _ref$min = _ref.min,
    min = _ref$min === void 0 ? 0 : _ref$min,
    name = _ref.name,
    onChange = _ref.onChange,
    _ref$opacity = _ref.opacity,
    opacity = _ref$opacity === void 0 ? 'medium' : _ref$opacity,
    round = _ref.round,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 1 : _ref$step,
    valuesProp = _ref.values,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var formContext = useContext(FormContext);
  var _useState = useState(),
    changing = _useState[0],
    setChanging = _useState[1];
  var _useState2 = useState(),
    lastChange = _useState2[0],
    setLastChange = _useState2[1];
  var _useState3 = useState(),
    moveValue = _useState3[0],
    setMoveValue = _useState3[1];
  var containerRef = useRef();
  var maxRef = useRef();
  var minRef = useRef();
  var labelWidthRef = useRef(0);
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valuesProp == null ? void 0 : valuesProp.map(function (n) {
        return clamp(n, min, max);
      }),
      initialValue: defaultValues
    }),
    values = _formContext$useFormI[0],
    setValues = _formContext$useFormI[1];

  // for DataFilters to know when RangeSelector is set to its min/max
  var _useContext2 = useContext(DataFormContext),
    pendingReset = _useContext2.pendingReset;
  var updatePendingReset = useCallback(function (nextMin, nextMax) {
    var _pendingReset$current;
    if (nextMin === min && nextMax === max) {
      pendingReset == null || pendingReset.current.add(name);
    } else if (pendingReset != null && (_pendingReset$current = pendingReset.current) != null && _pendingReset$current.has(name)) {
      pendingReset == null || pendingReset.current["delete"](name);
    }
  }, [max, min, name, pendingReset]);
  var change = useCallback(function (nextValues) {
    var nextMin = nextValues[0],
      nextMax = nextValues[1];
    // only adjust value to step precision if it's not the min/max
    if (nextMin !== min && nextMin !== max) nextMin = valueToStepPrecision(nextValues[0], step, min);
    if (nextMax !== min && nextMax !== max) nextMax = valueToStepPrecision(nextValues[1], step, min);

    // ensure values are within min/max
    nextMin = clamp(nextMin, min, max);
    nextMax = clamp(nextMax, min, max);

    // make sure this is only called if both of the values
    // are actually distinct from the previous values
    if (nextMin !== values[0] || nextMax !== values[1]) {
      updatePendingReset(nextMin, nextMax);
      setValues([nextMin, nextMax]);
      if (onChange) onChange([nextMin, nextMax]);
    }
  }, [onChange, setValues, step, max, min, values, updatePendingReset]);
  var valueForMouseCoord = useCallback(function (event) {
    var rect = containerRef.current.getBoundingClientRect();
    var value;
    if (direction === 'vertical') {
      // there is no x and y in unit testing
      var y = event.clientY - (rect.top || 0); // test resilience
      var scaleY = rect.height / (max - min + 1) || 1; // test resilience
      value = Math.floor(y / scaleY) + min;
    } else {
      var x = event.clientX - (rect.left || 0); // test resilience
      var scaleX = rect.width / (max - min + 1) || 1; // test resilience
      value = Math.floor(x / scaleX) + min;
    }
    // align with closest step within [min, max]
    var result = Math.ceil(value / step) * step;
    if (result < min) {
      return min;
    }
    if (result > max) {
      return max;
    }
    return result;
  }, [direction, max, min, step]);
  var onMouseMove = useCallback(function (event) {
    var value = valueForMouseCoord(event);
    var nextValues;
    if (changing === 'lower' && value <= values[1] && value !== moveValue) {
      nextValues = [value, values[1]];
    } else if (changing === 'upper' && value >= values[0] && value !== moveValue) {
      nextValues = [values[0], value];
    } else if (changing === 'selection' && value !== moveValue) {
      if (value === max) {
        nextValues = [max - (values[1] - values[0]), max];
      } else if (value === min) {
        nextValues = [min, min + (values[1] - values[0])];
      } else {
        var delta = value - moveValue;
        if (values[0] + delta >= min && values[1] + delta <= max) {
          nextValues = [values[0] + delta, values[1] + delta];
        }
      }
    }
    if (nextValues) {
      setMoveValue(value);
      change(nextValues);
    }
  }, [values, change, changing, moveValue, max, min, setMoveValue, valueForMouseCoord]);
  useEffect(function () {
    var onMouseUp = function onMouseUp() {
      return setChanging(undefined);
    };
    if (changing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return function () {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
    return undefined;
  }, [changing, onMouseMove]);
  var onClick = useCallback(function (event) {
    var value = valueForMouseCoord(event);
    if (value <= values[0] || value < values[1] && lastChange === 'lower') {
      setLastChange('lower');
      change([value, values[1]]);
    } else if (value >= values[1] || value > values[0] && lastChange === 'upper') {
      setLastChange('upper');
      change([values[0], value]);
    }
  }, [change, lastChange, valueForMouseCoord, values]);
  var onTouchMove = useCallback(function (event) {
    var touchEvent = event.changedTouches[0];
    onMouseMove(touchEvent);
  }, [onMouseMove]);

  // keep the text values size consistent
  useLayoutEffect(function () {
    if (maxRef.current && minRef.current) {
      maxRef.current.style.width = '';
      minRef.current.style.width = '';
      var width = Math.max(labelWidthRef.current, maxRef.current.getBoundingClientRect().width, minRef.current.getBoundingClientRect().width);
      maxRef.current.style.width = width + "px";
      minRef.current.style.width = width + "px";
      labelWidthRef.current = width;
    }
  });
  var lower = values[0],
    upper = values[1];
  // It needs to be true when vertical, due to how browsers manage height
  // const fill = direction === 'vertical' ? true : 'horizontal';
  var thickness = size === 'full' ? undefined : parseMetricToNum(theme.global.edgeSize[size] || size) + "px";
  var layoutProps = {
    fill: direction,
    round: round
  };
  if (direction === 'vertical') layoutProps.width = thickness;else layoutProps.height = thickness;
  if (size === 'full') layoutProps.alignSelf = 'stretch';
  var content = /*#__PURE__*/React.createElement(Container, _extends({
    ref: containerRef,
    direction: direction === 'vertical' ? 'column' : 'row',
    align: "center",
    fill: true
  }, label ? {} : rest, {
    tabIndex: "-1",
    onClick: onClick,
    onTouchMove: onTouchMove
  }), /*#__PURE__*/React.createElement(Box, _extends({
    style: {
      flex: lower - min + " 0 0"
    },
    background: invert ?
    // preserve existing dark, instead of using darknes
    // of this color
    {
      color: color || theme.rangeSelector.background.invert.color,
      opacity: opacity,
      dark: theme.dark
    } : undefined
  }, layoutProps)), /*#__PURE__*/React.createElement(EdgeControl, {
    a11yTitle: format({
      id: 'rangeSelector.lower',
      messages: messages
    }),
    role: "slider",
    "aria-valuenow": lower,
    "aria-valuemin": min,
    "aria-valuemax": max,
    tabIndex: 0,
    ref: ref,
    color: color,
    direction: direction,
    thickness: thickness,
    edge: "lower",
    onMouseDown: function onMouseDown() {
      return setChanging('lower');
    },
    onTouchStart: function onTouchStart() {
      return setChanging('lower');
    },
    onDecrease: function onDecrease() {
      return change([lower - step, upper]);
    },
    onIncrease: lower + step <= upper ? function () {
      return change([lower + step, upper]);
    } : function () {
      return change([upper, upper]);
    }
  }), /*#__PURE__*/React.createElement(Box, _extends({
    style: {
      flex: upper - lower + 1 + " 0 0",
      cursor: direction === 'vertical' ? 'ns-resize' : 'ew-resize'
    },
    background: invert ? undefined :
    // preserve existing dark, instead of using darknes of
    // this color
    {
      color: color || 'control',
      opacity: opacity,
      dark: theme.dark
    }
  }, layoutProps, {
    onMouseDown: function onMouseDown(event) {
      var nextMoveValue = valueForMouseCoord(event);
      setChanging('selection');
      setMoveValue(nextMoveValue);
    }
  })), /*#__PURE__*/React.createElement(EdgeControl, {
    a11yTitle: format({
      id: 'rangeSelector.upper',
      messages: messages
    }),
    role: "slider",
    "aria-valuenow": upper,
    "aria-valuemin": min,
    "aria-valuemax": max,
    tabIndex: 0,
    color: color,
    direction: direction,
    thickness: thickness,
    edge: "upper",
    onMouseDown: function onMouseDown() {
      return setChanging('upper');
    },
    onTouchStart: function onTouchStart() {
      return setChanging('upper');
    },
    onDecrease: upper - step >= lower ? function () {
      return change([lower, upper - step]);
    } : function () {
      return change([lower, lower]);
    },
    onIncrease: function onIncrease() {
      return change([lower, upper + step]);
    }
  }), /*#__PURE__*/React.createElement(Box, _extends({
    style: {
      flex: max - upper + " 0 0"
    },
    background: invert ?
    // preserve existing dark, instead of using darknes of this
    // color
    {
      color: color || theme.rangeSelector.background.invert.color,
      opacity: opacity,
      dark: theme.dark
    } : undefined
  }, layoutProps, {
    round: round
  })));
  if (label) {
    content = /*#__PURE__*/React.createElement(Box, _extends({
      direction: direction === 'vertical' ? 'column' : 'row',
      align: "center",
      fill: true
    }, rest), /*#__PURE__*/React.createElement(Text, {
      ref: minRef,
      textAlign: "end",
      size: "small",
      margin: {
        horizontal: 'small'
      }
    }, typeof label === 'function' ? label(lower) : lower), content, /*#__PURE__*/React.createElement(Text, {
      ref: maxRef,
      size: "small",
      margin: {
        horizontal: 'small'
      }
    }, typeof label === 'function' ? label(upper) : upper));
  }
  return content;
});
RangeSelector.displayName = 'RangeSelector';
RangeSelector.propTypes = RangeSelectorPropTypes;
export { RangeSelector };