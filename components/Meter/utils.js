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

var defaultColor = function defaultColor(index, theme) {
  var neutralColors = Object.keys(theme.global.colors).filter(function (k) {
    return neutralExp.test(k);
  });
  return neutralColors[index % neutralColors.length];
};

exports.defaultColor = defaultColor;