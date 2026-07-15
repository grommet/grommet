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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Bar = exports.Bar = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _theme$meter$gap, _theme$meter;
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
  var gapTheme = (_theme$meter$gap = (_theme$meter = theme.meter) == null ? void 0 : _theme$meter.gap) != null ? _theme$meter$gap : 0;
  var gap = (0, _utils.parseMetricToNum)(theme.global.edgeSize[gapTheme] || gapTheme);

  // account for the round cap, if any
  var capRadius = round ? thickness / 2 : 0;
  var mid = thickness / 2;
  var someHighlight = (values || []).some(function (v) {
    return v.highlight;
  });
  var start = direction === 'horizontal' ? capRadius : length - capRadius;

  // Available space for the bar is the length of the meter minus an end cap
  // on each end, minus the gap between bars.
  var lengthAvailable = length - 2 * capRadius - gap * (values.length - 1);
  var paths = (values || []).reduce(function (acc, valueArg, index) {
    if (valueArg.value > 0) {
      var color = valueArg.color,
        highlight = valueArg.highlight,
        label = valueArg.label,
        onHover = valueArg.onHover,
        value = valueArg.value,
        pathRest = _objectWithoutPropertiesLoose(valueArg, _excluded2);
      var key = "p-" + index;
      var delta = value * lengthAvailable / max;

      // add a little bit extra to start to allow for larger rounded inset cap
      // The extra needed can be calculated by the Pythagorean theorem
      var extraGap = round && index !== 0 ? Math.sqrt(Math.pow(thickness / 2 + gap / 4, 2) - Math.pow(thickness / 2, 2)) : 0;
      var initialStart = direction === 'horizontal' ? start + extraGap : start - extraGap;

      // define the x,y points for the corners of the bar.
      var points = direction === 'horizontal' ? [initialStart + "," + thickness, initialStart + ",0", start + delta + ",0", start + delta + "," + thickness] : [thickness + "," + initialStart, "0," + initialStart, "0," + (start - delta), thickness + "," + (start - delta)];

      // if rounded, the starting cap is an arc. All but the first bar
      // will have a gap and a slightly larger radius
      var startRadius = index === 0 ? capRadius : capRadius + gap / 2;
      var startCap = round ? "A " + startRadius + "," + startRadius + " 0 0 " + (index === 0 ? 1 : 0) + " " + points[1] : "L " + points[1];
      var endCap = round ? "A " + capRadius + "," + capRadius + " 0 0 1 " + points[3] : "L " + points[3];
      var d = "M " + points[0] + " " + startCap + " L " + points[2] + " " + endCap + " Z";
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
      var fill = (0, _utils2.fillProps)(someHighlight && !highlight ? background : colorName, theme);
      acc.push(/*#__PURE__*/_react["default"].createElement("path", _extends({
        key: key,
        d: d
      }, fill, {
        strokeWidth: 0,
        stroke: "none"
      }, hoverProps, pathRest)));
      if (direction === 'horizontal') {
        start += delta + gap;
      } else {
        start -= delta + gap;
      }
    }
    return acc;
  }, []).reverse(); // reverse so the caps look right

  var width;
  if (direction === 'horizontal') {
    width = size === 'full' ? '100%' : length;
  } else {
    width = size === 'full' ? '100%' : thickness;
  }
  var backgroundPath = direction === 'horizontal' ? "M " + capRadius + "," + mid + " L " + (length - capRadius) + "," + mid : "M " + mid + "," + capRadius + " L " + mid + "," + (length - capRadius);
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