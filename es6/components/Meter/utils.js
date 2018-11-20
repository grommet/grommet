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
export var defaultColor = function defaultColor(index, theme) {
  var neutralColors = Object.keys(theme.global.colors).filter(function (k) {
    return neutralExp.test(k);
  });
  return neutralColors[index % neutralColors.length];
};