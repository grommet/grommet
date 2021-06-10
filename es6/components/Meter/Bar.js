var _excluded = ["background", "max", "round", "size", "thickness", "direction", "values"],
    _excluded2 = ["color", "highlight", "label", "onHover", "value"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';
import { StyledMeter } from './StyledMeter';
import { strokeProps, defaultColor } from './utils';
var Bar = /*#__PURE__*/forwardRef(function (props, ref) {
  var background = props.background,
      max = props.max,
      round = props.round,
      size = props.size,
      thicknessProp = props.thickness,
      direction = props.direction,
      values = props.values,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var length = size === 'full' ? 288 : parseMetricToNum(theme.global.size[size] || size);
  var thickness = parseMetricToNum(theme.global.edgeSize[thicknessProp] || thicknessProp); // account for the round cap, if any

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
  }, rest), /*#__PURE__*/React.createElement("path", _extends({
    d: backgroundPath,
    fill: "none"
  }, strokeProps(background, theme), {
    strokeWidth: thickness,
    strokeLinecap: round ? 'round' : 'square'
  })), paths);
});
Bar.displayName = 'Bar';
Bar.defaultProps = {
  background: 'light-1'
};
Object.setPrototypeOf(Bar.defaultProps, defaultProps);
export { Bar };