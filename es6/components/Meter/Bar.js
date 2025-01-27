var _excluded = ["background", "max", "round", "size", "thickness", "direction", "values", "reverse"],
  _excluded2 = ["color", "highlight", "label", "onHover", "value"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef } from 'react';
import { parseMetricToNum } from '../../utils';
import { StyledMeter } from './StyledMeter';
import { strokeProps, defaultColor } from './utils';
import { useThemeValue } from '../../utils/useThemeValue';
var Bar = /*#__PURE__*/forwardRef(function (props, ref) {
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
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var length = size === 'full' ? 288 : parseMetricToNum(theme.global.size[size] || size);
  var thickness = parseMetricToNum(theme.global.edgeSize[thicknessProp] || thicknessProp);
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
      var colorName = color || defaultColor(index, theme, values ? values.length : 0);
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
      var result = /*#__PURE__*/React.createElement("path", _extends({
        key: key,
        d: d,
        fill: "none"
      }, strokeProps(someHighlight && !highlight ? background : colorName, theme), {
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
  return /*#__PURE__*/React.createElement(StyledMeter, _extends({
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
  }), /*#__PURE__*/React.createElement("path", _extends({
    d: backgroundPath,
    fill: "none"
  }, strokeProps(background, theme), {
    strokeWidth: thickness,
    strokeLinecap: round ? 'round' : 'square'
  })), paths);
});
Bar.displayName = 'Bar';
export { Bar };