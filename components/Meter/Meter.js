"use strict";

exports.__esModule = true;
exports.Meter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Bar = require("./Bar");

var _Circle = require("./Circle");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var Meter = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  var values = (0, _react.useMemo)(function () {
    if (valuesProp) return valuesProp;
    if (value) return [{
      color: color,
      value: value
    }];
    return [];
  }, [color, value, valuesProp]);
  var memoizedMax = (0, _react.useMemo)(function () {
    return deriveMax(values);
  }, [values]);
  var content;

  if (type === 'bar') {
    content = /*#__PURE__*/_react["default"].createElement(_Bar.Bar, _extends({
      ref: ref,
      max: memoizedMax,
      values: values,
      size: size,
      thickness: thickness,
      background: background
    }, rest));
  } else if (type === 'circle') {
    content = /*#__PURE__*/_react["default"].createElement(_Circle.Circle, _extends({
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
exports.Meter = MeterWrapper;