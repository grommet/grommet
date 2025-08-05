"use strict";

exports.__esModule = true;
exports.strokeProps = exports.fillProps = exports.defaultColor = void 0;
var _utils = require("../../utils");
var strokeProps = exports.strokeProps = function strokeProps(color, theme) {
  var result = {};
  if (color) {
    if (typeof color === 'object') {
      result.stroke = (0, _utils.normalizeColor)(color.color, theme);
      if (color.opacity) {
        result.strokeOpacity = "" + (color.opacity === true ? theme.global.opacity.medium : theme.global.opacity[color.opacity] || color.opacity);
      }
    } else {
      result.stroke = (0, _utils.normalizeColor)(color, theme);
    }
  }
  return result;
};
var fillProps = exports.fillProps = function fillProps(color, theme) {
  var result = {};
  if (color) {
    if (typeof color === 'object') {
      result.fill = (0, _utils.normalizeColor)(color.color, theme);
      if (color.opacity) {
        result.fillOpacity = "" + (color.opacity === true ? theme.global.opacity.medium : theme.global.opacity[color.opacity] || color.opacity);
      }
    } else {
      result.fill = (0, _utils.normalizeColor)(color, theme);
    }
  }
  return result;
};
var neutralExp = /^neutral-\d+/;
var defaultColor = exports.defaultColor = function defaultColor(index, theme, valuesLength) {
  if (index === valuesLength - 1 && theme.meter.color) {
    return theme.meter.color;
  }
  // We want the last value to have the first color
  var colorIndex = valuesLength - index - 1;
  if (theme.meter && theme.meter.colors) {
    var _colors = theme.meter.colors[theme.dark ? 'dark' : 'light'] || theme.meter.colors;
    return _colors[colorIndex % _colors.length];
  }
  var colors = Object.keys(theme.global.colors).filter(function (n) {
    return n.match(/^graph-[0-9]$/);
  });
  if (colors.length > 0) {
    return colors[colorIndex % colors.length];
  }
  // Deprecate using "neutral-*" color names. Remove eventually.
  var neutralColors = Object.keys(theme.global.colors).filter(function (k) {
    return neutralExp.test(k);
  });
  return neutralColors[colorIndex % neutralColors.length];
};