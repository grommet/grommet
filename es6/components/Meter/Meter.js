function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useMemo } from 'react';
import { Bar } from './Bar';
import { Circle } from './Circle';

var deriveMax = function deriveMax(values) {
  var max = 100;

  if (values && values.length > 1) {
    max = 0;
    values.forEach(function (v) {
      max += v.value;
    });
  }

  return max;
};

var Meter = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$background = _ref.background,
      background = _ref$background === void 0 ? {
    color: 'light-2',
    opacity: 'medium'
  } : _ref$background,
      color = _ref.color,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'medium' : _ref$size,
      _ref$thickness = _ref.thickness,
      thickness = _ref$thickness === void 0 ? 'medium' : _ref$thickness,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'bar' : _ref$type,
      value = _ref.value,
      valuesProp = _ref.values,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "color", "size", "thickness", "type", "value", "values"]);

  // normalize values to an array of objects
  var values = useMemo(function () {
    if (valuesProp) return valuesProp;
    if (value) return [{
      color: color,
      value: value
    }];
    return [];
  }, [color, value, valuesProp]);
  var memoizedMax = useMemo(function () {
    return deriveMax(values);
  }, [values]);
  var content;

  if (type === 'bar') {
    content = /*#__PURE__*/React.createElement(Bar, _extends({
      ref: ref,
      max: memoizedMax,
      values: values,
      size: size,
      thickness: thickness,
      background: background
    }, rest));
  } else if (type === 'circle') {
    content = /*#__PURE__*/React.createElement(Circle, _extends({
      ref: ref,
      max: memoizedMax,
      values: values,
      size: size,
      thickness: thickness,
      background: background
    }, rest));
  }

  return content;
});
Meter.displayName = 'Meter';
var MeterDoc;

if (process.env.NODE_ENV !== 'production') {
  MeterDoc = require('./doc').doc(Meter); // eslint-disable-line global-require
}

var MeterWrapper = MeterDoc || Meter;
export { MeterWrapper as Meter };