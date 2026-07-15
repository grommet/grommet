"use strict";

exports.__esModule = true;
exports.Circle = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _StyledMeter = require("./StyledMeter");
var _utils2 = require("./utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["background", "max", "round", "size", "thickness", "type", "values"],
  _excluded2 = ["color", "highlight", "label", "onHover", "value"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Circle = exports.Circle = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _theme$meter$gap, _theme$meter;
  var background = props.background,
    max = props.max,
    round = props.round,
    size = props.size,
    thickness = props.thickness,
    type = props.type,
    values = props.values,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var width = size === 'full' ? 288 : (0, _utils.parseMetricToNum)(theme.global.size[size] || size);
  var strokeWidth = type === 'pie' ? width / 2 : Math.min(width / 2 - 8, (0, _utils.parseMetricToNum)(theme.global.edgeSize[thickness] || thickness));
  var centerX = width / 2;
  var centerY = width / 2;
  var radius = width / 2 - strokeWidth / 2;
  // truncate to avoid floating point arithmetic errors
  // see: https://github.com/grommet/grommet/issues/6190
  // Choose a scale factor at least 3 orders of magnitude above max
  var scalePower = Math.max(5, Math.ceil(Math.log10(max)) + 3);
  var scale = Math.pow(10, scalePower);
  var anglePer = Math.floor((type === 'semicircle' ? 180 : 360) / max * scale) / scale;
  var someHighlight = (values || []).some(function (v) {
    return v.highlight;
  });
  var gapTheme = (_theme$meter$gap = (_theme$meter = theme.meter) == null ? void 0 : _theme$meter.gap) != null ? _theme$meter$gap : '0';
  var gap = (0, _utils.parseMetricToNum)(theme.global.edgeSize[gapTheme] || gapTheme);
  var isSemi = type === 'semicircle';
  var isFull = values.reduce(function (total, currentValue) {
    return total + currentValue.value;
  }, 0) >= max;
  var startValue = 0;
  var startAngle = isSemi ? 270 : 0;
  var paths = [];
  (values || []).filter(function (v) {
    return v.value > 0;
  }).forEach(function (valueArg, index, _ref) {
    var length = _ref.length;
    var color = valueArg.color,
      highlight = valueArg.highlight,
      label = valueArg.label,
      onHover = valueArg.onHover,
      value = valueArg.value,
      pathRest = _objectWithoutPropertiesLoose(valueArg, _excluded2);
    var key = "p-" + index;
    var colorName = color || (0, _utils2.defaultColor)(index, theme, values ? values.length : 0);
    var endAngle;
    if (startValue + value >= max) {
      endAngle = isSemi ? 90 : 360;
    } else {
      endAngle = (0, _utils.translateEndAngle)(startAngle, anglePer, value);
    }
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
    var stroke = (0, _utils2.strokeProps)(someHighlight && !highlight ? background : colorName, theme);
    var fill = (0, _utils2.fillProps)(someHighlight && !highlight ? background : colorName, theme);
    var outerRadius = width / 2;
    var innerRadius = type === 'pie' ? 0 : width / 2 - strokeWidth;

    // We want a start gap if there's another segment before this one.
    // A circle's last segment can bump against the first segment if at max.
    var startGap = index === 0 && (isSemi || length === 1 || length > 1 && !isFull) ? 0 : gap / 2;

    // Similarly, we only need an end gap if there's a segment after this one.
    var endGap = index === length - 1 && (isSemi || length === 1) ? 0 : -gap / 2;
    var startRound = index === 0 && isSemi ? false : round;
    var d = (0, _utils.wedgeCommands)(centerX, centerY, outerRadius, innerRadius, startAngle, endAngle, startGap, endGap, startRound, round, index === 0 ? 1 : 0);
    paths.push(/*#__PURE__*/_react["default"].createElement("path", _extends({
      key: key,
      d: d
    }, fill, stroke, {
      strokeWidth: 0,
      strokeLinecap: "butt"
    }, hoverProps, pathRest)));
    startValue += value;
    startAngle = endAngle;
  });
  var track;
  if (type === 'semicircle') {
    var d1 = (0, _utils.arcCommands)(centerX, centerY, radius, 270, 90);
    track = /*#__PURE__*/_react["default"].createElement("path", _extends({
      d: d1,
      strokeWidth: strokeWidth,
      fill: "none"
    }, (0, _utils2.strokeProps)(background, theme), {
      strokeLinecap: round ? 'round' : 'square'
    }));
  } else {
    track = /*#__PURE__*/_react["default"].createElement("circle", _extends({
      cx: centerX,
      cy: centerY,
      r: radius
    }, (0, _utils2.strokeProps)(background, theme), {
      strokeWidth: strokeWidth,
      strokeLinecap: round ? 'round' : 'square',
      fill: "none"
    }));
  }
  var viewBoxHeight = type === 'semicircle' ? width / 2 : width;
  return /*#__PURE__*/_react["default"].createElement(_StyledMeter.StyledMeter, _extends({
    ref: ref,
    viewBox: "0 0 " + width + " " + viewBoxHeight,
    width: size === 'full' ? '100%' : width,
    height: size === 'full' ? '100%' : viewBoxHeight
  }, passThemeFlag, rest), track, paths);
});
Circle.displayName = 'Circle';