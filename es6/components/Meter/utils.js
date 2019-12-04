import { normalizeColor } from '../../utils';
export var strokeProps = function strokeProps(color, theme) {
  var result = {};

  if (color) {
    if (typeof color === 'object') {
      result.stroke = normalizeColor(color.color, theme);

      if (color.opacity) {
        result.strokeOpacity = "" + (color.opacity === true ? theme.global.opacity.medium : theme.global.opacity[color.opacity]);
      }
    } else {
      result.stroke = normalizeColor(color, theme);
    }
  }

  return result;
};
var neutralExp = /^neutral-\d+/;
export var defaultColor = function defaultColor(index, theme, valuesLength) {
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