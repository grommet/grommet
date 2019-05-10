function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { arcCommands, parseMetricToNum, translateEndAngle } from '../../utils';
import { StyledMeter } from './StyledMeter';
import { strokeProps, defaultColor } from './utils';

var Circle = function Circle(props) {
  var background = props.background,
      max = props.max,
      round = props.round,
      size = props.size,
      theme = props.theme,
      thickness = props.thickness,
      values = props.values,
      rest = _objectWithoutPropertiesLoose(props, ["background", "max", "round", "size", "theme", "thickness", "values"]);

  var width = size === 'full' ? 288 : parseMetricToNum(theme.global.size[size] || size);
  var height = parseMetricToNum(theme.global.edgeSize[thickness] || thickness);
  var mid = width / 2;
  var radius = width / 2 - height / 2;
  var anglePer = 360 / max;
  var someHighlight = (values || []).some(function (v) {
    return v.highlight;
  });
  var startValue = 0;
  var startAngle = 0;
  var paths = [];
  var pathCaps = [];
  (values || []).filter(function (v) {
    return v.value > 0;
  }).forEach(function (valueArg, index) {
    var color = valueArg.color,
        highlight = valueArg.highlight,
        label = valueArg.label,
        onHover = valueArg.onHover,
        value = valueArg.value,
        pathRest = _objectWithoutPropertiesLoose(valueArg, ["color", "highlight", "label", "onHover", "value"]);

    var key = "p-" + index;
    var colorName = color || (index === values.length - 1 ? theme.meter.color : defaultColor(index, theme));
    var endAngle;

    if (startValue + value >= max) {
      endAngle = 360;
    } else {
      endAngle = Math.min(360, translateEndAngle(startAngle, anglePer, value));
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

    var stroke = strokeProps(someHighlight && !highlight ? background : colorName, theme);

    if (round) {
      var d1 = arcCommands(width / 2, width / 2, radius, startAngle, endAngle);
      paths.unshift(React.createElement("path", _extends({
        key: key,
        d: d1,
        fill: "none"
      }, stroke, {
        strokeWidth: height,
        strokeLinecap: "round"
      }, hoverProps, pathRest))); // To handle situations where the last values are small, redraw
      // a dot at the end. Give just a bit of angle to avoid anti-aliasing
      // leakage around the edge.

      var d2 = arcCommands(width / 2, width / 2, radius, endAngle - 0.5, endAngle);
      var pathCap = React.createElement("path", _extends({
        key: key + "-",
        d: d2,
        fill: "none"
      }, stroke, {
        strokeWidth: height,
        strokeLinecap: "round"
      }, hoverProps, pathRest)); // If we are on a large enough path to not need re-drawing previous ones,
      // clear the pathCaps we've collected already.

      if (endAngle - startAngle > 2 * anglePer) {
        pathCaps = [];
      }

      pathCaps.unshift(pathCap);
    } else {
      var d = arcCommands(width / 2, width / 2, radius, startAngle, endAngle);
      paths.push(React.createElement("path", _extends({
        key: key,
        d: d,
        fill: "none"
      }, stroke, {
        strokeWidth: height,
        strokeLinecap: "butt"
      }, hoverProps, pathRest)));
    }

    startValue += value;
    startAngle = endAngle;
  });
  return React.createElement(StyledMeter, _extends({
    viewBox: "0 0 " + width + " " + width,
    width: size === 'full' ? '100%' : width,
    height: size === 'full' ? '100%' : width
  }, rest), React.createElement("circle", _extends({
    cx: mid,
    cy: mid,
    r: radius
  }, strokeProps(background, theme), {
    strokeWidth: height,
    strokeLinecap: round ? 'round' : 'square',
    fill: "none"
  })), paths, pathCaps);
};

Circle.defaultProps = {};
Object.setPrototypeOf(Circle.defaultProps, defaultProps);
var CircleWrapper = compose(withTheme)(Circle);
export { CircleWrapper as Circle };