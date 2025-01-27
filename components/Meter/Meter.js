"use strict";

exports.__esModule = true;
exports.Meter = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Bar = require("./Bar");
var _Circle = require("./Circle");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _MessageContext = require("../../contexts/MessageContext");
var _excluded = ["aria-label", "background", "color", "direction", "max", "messages", "size", "thickness", "type", "reverse", "value", "values"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Meter = exports.Meter = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _messages$meter;
  var ariaLabel = _ref['aria-label'],
    _ref$background = _ref.background,
    background = _ref$background === void 0 ? {
      color: 'light-2',
      opacity: 'medium'
    } : _ref$background,
    color = _ref.color,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
    maxProp = _ref.max,
    messages = _ref.messages,
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;

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
  var max = (0, _react.useMemo)(function () {
    var maxValue = 100;
    if ((values == null ? void 0 : values.length) > 1) {
      maxValue = values.reduce(function (total, currentValue) {
        return total + currentValue.value;
      }, 0);
    }
    return maxProp || maxValue || 100;
  }, [maxProp, values]);
  var messageId = (values == null ? void 0 : values.length) === 1 ? 'singular' : 'plural';
  var meterType = type || 'bar';
  var meterAriaLabel = ariaLabel || format({
    id: "meter." + meterType + "." + messageId,
    messages: messages == null || (_messages$meter = messages.meter) == null ? void 0 : _messages$meter[meterType],
    values: {
      meterValue: value || values.map(function (item) {
        var _item$value;
        return (_item$value = item.value) != null ? _item$value : 0;
      }).join(', ') || 0,
      type: type,
      max: max
    }
  });
  var content;
  if (type === 'bar') {
    content = /*#__PURE__*/_react["default"].createElement(_Bar.Bar, _extends({
      ref: ref,
      "aria-label": meterAriaLabel,
      max: max,
      values: values,
      size: size,
      thickness: thickness,
      background: background,
      direction: direction,
      reverse: reverse
    }, rest));
  } else if (type === 'circle' || type === 'pie' || type === 'semicircle') {
    content = /*#__PURE__*/_react["default"].createElement(_Circle.Circle, _extends({
      "aria-label": meterAriaLabel,
      ref: ref,
      max: max,
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