"use strict";

exports.__esModule = true;
exports.defaultColor = exports.strokeProps = void 0;

var _utils = require("../../utils");

var strokeProps = function strokeProps(color, theme) {
  var result = {};

  if (color) {
    if (typeof color === 'object') {
      result.stroke = (0, _utils.normalizeColor)(color.color, theme);

      if (color.opacity) {
        result.strokeOpacity = "" + (color.opacity === true ? theme.global.opacity.medium : theme.global.opacity[color.opacity]);
      }
    } else {
      result.stroke = (0, _utils.normalizeColor)(color, theme);
    }
  }

  return result;
};

exports.strokeProps = strokeProps;
var neutralExp = /^neutral-\d+/;

var defaultColor = function defaultColor(index, theme, valuesLength) {
  if (index === valuesLength - 1 && theme.meter.color) {
    return theme.meter.color;
  }

  if (theme.meter && theme.meter.colors) {
    var colors = theme.meter.colors[theme.dark ? 'dark' : 'light'] || theme.meter.colors;
    return colors[index % colors.length];
  }

  if (theme.global.graph && theme.global.graph.colors) {
    var _colors = theme.global.graph.colors[theme.dark ? 'dark' : 'light'] || theme.global.graph.colors;

    return _colors[index % _colors.length];
  } // Deprecate using "neutral-*" color names. Remove eventually.


  var neutralColors = Object.keys(theme.global.colors).filter(function (k) {
    return neutralExp.test(k);
  });
  return neutralColors[index % neutralColors.length];
};

exports.defaultColor = defaultColor;