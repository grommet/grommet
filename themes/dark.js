"use strict";

exports.__esModule = true;
exports.dark = void 0;

var _styledComponents = require("styled-components");

var _object = require("../utils/object");

var _colors = require("../utils/colors");

var accentColors = ['#FD6FFF', '#60EB9F', '#60EBE1', '#FFCA58'];
var neutralColors = ['#EB6060', '#01C781', '#6095EB', '#FFB200'];
var statusColors = {
  critical: '#FF3333',
  error: '#FF3333',
  warning: '#F7E464',
  ok: '#7DD892',
  unknown: '#a8a8a8',
  disabled: '#a8a8a8'
};
var backgroundColor = '#111111';
var colors = {
  active: 'rgba(102, 102, 102, 0.5)',
  background: backgroundColor,
  black: '#000000',
  brand: '#FD6FFF',
  control: {
    dark: '#FFCA58',
    light: '#403216'
  },
  focus: '#FFCA58',
  icon: {
    dark: '#f8f8f8',
    light: '#666666'
  },
  placeholder: '#AAAAAA',
  text: {
    dark: '#eeeeee',
    light: '#444444'
  },
  white: '#FFFFFF'
};

var colorArray = function colorArray(array, prefix) {
  return array.forEach(function (color, index) {
    colors[prefix + "-" + (index + 1)] = color;
  });
};

colorArray(accentColors, 'accent');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach(function (color) {
  colors["status-" + color] = statusColors[color];
});
var dark = (0, _object.deepFreeze)({
  global: {
    colors: colors,
    drop: {
      background: '#333333'
    },
    focus: {
      border: {
        color: (0, _styledComponents.css)(["", ";"], function (props) {
          return (0, _colors.normalizeColor)('focus', props.theme);
        }),
        width: '2px'
      }
    },
    font: {
      family: 'Arial'
    },
    input: {
      weight: 700
    }
  },
  anchor: {
    color: 'control'
  },
  layer: {
    background: backgroundColor,
    overlay: {
      background: 'rgba(48, 48, 48, 0.5)'
    }
  }
});
exports.dark = dark;