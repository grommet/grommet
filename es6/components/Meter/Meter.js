var _excluded = ["background", "color", "direction", "size", "thickness", "type", "reverse", "value", "values"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useMemo } from 'react';
import { Bar } from './Bar';
import { Circle } from './Circle';
import { MeterPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
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
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$thickness = _ref.thickness,
    thickness = _ref$thickness === void 0 ? 'medium' : _ref$thickness,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'bar' : _ref$type,
    reverseProp = _ref.reverse,
    value = _ref.value,
    valuesProp = _ref.values,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useThemeValue();

  // normalize values to an array of objects
  var values = useMemo(function () {
    if (valuesProp) return valuesProp;
    if (value) return [{
      color: color,
      value: value
    }];
    return [];
  }, [color, value, valuesProp]);
  var reverse = direction === 'horizontal' && (theme.dir === 'rtl' || reverseProp) && !(theme.dir === 'rtl' && reverseProp);
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
      background: background,
      direction: direction,
      reverse: reverse
    }, rest));
  } else if (type === 'circle' || type === 'pie' || type === 'semicircle') {
    content = /*#__PURE__*/React.createElement(Circle, _extends({
      ref: ref,
      max: memoizedMax,
      values: values,
      size: size,
      thickness: thickness,
      type: type,
      background: background,
      reverse: reverse
    }, rest));
  }
  return content;
});
Meter.displayName = 'Meter';
Meter.prototype = MeterPropTypes;
export { Meter };