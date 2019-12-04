import { normalizeColor } from '../../utils';

export const strokeProps = (color, theme) => {
  const result = {};
  if (color) {
    if (typeof color === 'object') {
      result.stroke = normalizeColor(color.color, theme);
      if (color.opacity) {
        result.strokeOpacity = `${
          color.opacity === true
            ? theme.global.opacity.medium
            : theme.global.opacity[color.opacity]
        }`;
      }
    } else {
      result.stroke = normalizeColor(color, theme);
    }
  }
  return result;
};

const neutralExp = /^neutral-\d+/;

export const defaultColor = (index, theme) => {
  if (theme.meter && index === 0 && theme.meter.color) {
    return theme.meter.color;
  }
  if (theme.meter && theme.meter.colors) {
    const colors = theme.meter.colors[theme.dark ? 'dark' : 'light'] ||
      theme.meter.colors;
    return colors[theme % (colors.length)];
  }
  if (theme.global.graph && theme.global.graph.colors) {
    const colors = theme.global.graph.colors[theme.dark ? 'dark' : 'light'] ||
      theme.global.graph.colors;
    return colors[index % (colors.length)];
  }
  const neutralColors = Object.keys(theme.global.colors).filter(k =>
    neutralExp.test(k),
  );
  return neutralColors[index % neutralColors.length];
};
