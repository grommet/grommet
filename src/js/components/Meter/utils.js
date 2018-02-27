import { colorForName } from '../../utils';

export const strokeProps = (color, theme) => {
  const result = {};
  if (color) {
    if (typeof color === 'object') {
      result.stroke = colorForName(color.color, theme);
      if (color.opacity) {
        result.strokeOpacity = (color.opacity === true ?
          theme.global.opacity.medium : theme.global.opacity[color.opacity]);
      }
    } else {
      result.stroke = colorForName(color, theme);
    }
  }
  return result;
};

export default { strokeProps };
