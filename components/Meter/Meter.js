"use strict";

exports.__esModule = true;
exports.Meter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _defaultProps = require("../../default-props");
var _Bar = require("./Bar");
var _Circle = require("./Circle");
var _propTypes = require("./propTypes");
var _excluded = ["background", "color", "direction", "size", "thickness", "type", "reverse", "value", "values"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var Meter = exports.Meter = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  // normalize values to an array of objects
  var values = (0, _react.useMemo)(function () {
    if (valuesProp) return valuesProp;
    if (value) return [{
      color: color,
      value: value
    }];
    return [];
  }, [color, value, valuesProp]);
  var reverse = direction === 'horizontal' && (theme.dir === 'rtl' || reverseProp) && !(theme.dir === 'rtl' && reverseProp);
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
      background: background,
      direction: direction,
      reverse: reverse
    }, rest));
  } else if (type === 'circle' || type === 'pie' || type === 'semicircle') {
    content = /*#__PURE__*/_react["default"].createElement(_Circle.Circle, _extends({
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
Meter.prototype = _propTypes.MeterPropTypes;