"use strict";

exports.__esModule = true;
exports.Bar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _StyledMeter = require("./StyledMeter");
var _utils2 = require("./utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["background", "max", "round", "size", "thickness", "direction", "values", "reverse"],
  _excluded2 = ["color", "highlight", "label", "onHover", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Bar = exports.Bar = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _props$background = props.background,
    background = _props$background === void 0 ? 'light-1' : _props$background,
    max = props.max,
    round = props.round,
    size = props.size,
    thicknessProp = props.thickness,
    direction = props.direction,
    values = props.values,
    reverse = props.reverse,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var length = size === 'full' ? 288 : (0, _utils.parseMetricToNum)(theme.global.size[size] || size);
  var thickness = (0, _utils.parseMetricToNum)(theme.global.edgeSize[thicknessProp] || thicknessProp);
  // account for the round cap, if any
  var capOffset = round ? thickness / 2 : 0;
  var mid = thickness / 2;
  var someHighlight = (values || []).some(function (v) {
    return v.highlight;
  });
  var start = direction === 'horizontal' ? capOffset : max * (length - 2 * capOffset) / max;
  var paths = (values || []).reduce(function (acc, valueArg, index) {
    if (valueArg.value > 0) {
      var color = valueArg.color,
        highlight = valueArg.highlight,
        label = valueArg.label,
        onHover = valueArg.onHover,
        value = valueArg.value,
        pathRest = _objectWithoutPropertiesLoose(valueArg, _excluded2);
      var key = "p-" + index;
      var delta = value * (length - 2 * capOffset) / max;
      var d = direction === 'horizontal' ? "M " + start + "," + mid + " L " + (start + delta) + "," + mid : "M " + mid + "," + start + " L " + mid + "," + (start - delta);
      var colorName = color || (0, _utils2.defaultColor)(index, theme, values ? values.length : 0);
      var hoverProps;
      if (onHover) {
        hoverProps = {
          onMouseOver: function onMouseOver() {
            return onHover(true);
          },
          onMouseLeave: function onMouseLeave() {
            return onHover(false);
          }
        };
      }
      if (direction === 'horizontal') {
        start += delta;
      } else {
        start -= delta;
      }
      var result = /*#__PURE__*/_react["default"].createElement("path", _extends({
        key: key,
        d: d,
        fill: "none"
      }, (0, _utils2.strokeProps)(someHighlight && !highlight ? background : colorName, theme), {
        strokeWidth: direction === 'horizontal' ? thickness : length,
        strokeLinecap: round ? 'round' : 'butt'
      }, hoverProps, pathRest));
      acc.push(result);
    }
    return acc;
  }, []).reverse(); // reverse so the caps looks right

  var width;
  if (direction === 'horizontal') {
    width = size === 'full' ? '100%' : length;
  } else {
    width = size === 'full' ? '100%' : thickness;
  }
  var backgroundPath = direction === 'horizontal' ? "M " + capOffset + "," + mid + " L " + (length - capOffset) + "," + mid : "M " + mid + "," + capOffset + " L " + mid + "," + (length - capOffset);
  return /*#__PURE__*/_react["default"].createElement(_StyledMeter.StyledMeter, _extends({
    ref: ref,
    viewBox: direction === 'horizontal' ? "0 0 " + length + " " + thickness : "0 0 " + thickness + " " + length,
    preserveAspectRatio: "none",
    width: width,
    height: direction === 'horizontal' ? thickness : length,
    round: round ? {
      size: thicknessProp
    } : undefined
  }, passThemeFlag, rest, {
    reverse: reverse
  }), /*#__PURE__*/_react["default"].createElement("path", _extends({
    d: backgroundPath,
    fill: "none"
  }, (0, _utils2.strokeProps)(background, theme), {
    strokeWidth: thickness,
    strokeLinecap: round ? 'round' : 'square'
  })), paths);
});
Bar.displayName = 'Bar';