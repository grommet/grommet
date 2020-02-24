import { normalizeColor } from '../../utils';
export var strokeProps = function strokeProps(color, theme) {
  var result = {};

  if (color) {
    if (typeof color === 'object') {
      result.stroke = normalizeColor(color.color, theme);

      if (color.opacity) {
        result.strokeOpacity = "" + (color.opacity === true ? theme.global.opacity.medium : theme.global.opacity[color.opacity] || color.opacity);
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
  } // We want the last value to have the first color


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
  } // Deprecate using "neutral-*" color names. Remove eventually.


  var neutralColors = Object.keys(theme.global.colors).filter(function (k) {
    return neutralExp.test(k);
  });
  return neutralColors[colorIndex % neutralColors.length];
};