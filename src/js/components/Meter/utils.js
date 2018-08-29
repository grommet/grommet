import { colorForName } from '../../utils';

export const strokeProps = (color, theme) => {
  const result = {};
  if (color) {
    if (typeof color === 'object') {
      result.stroke = colorForName(color.color, theme);
      if (color.opacity) {
        result.strokeOpacity = (color.opacity === true
          ? theme.global.opacity.medium
          : theme.global.opacity[color.opacity]);
      }
    } else {
      result.stroke = colorForName(color, theme);
    }
  }
  return result;
};

const neutralExp = /^neutral-\d+/;

export const defaultColor = (index, theme) => {
  const neutralColors = Object.keys(theme.global.colors)
    .filter(k => neutralExp.test(k));
  return neutralColors[index % neutralColors.length];
};
