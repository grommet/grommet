import { colorForName } from '../../utils';

export const backgroundProps = (background, theme) => {
  const result = {};
  if (background) {
    if (typeof background === 'object') {
      result.stroke = colorForName(background.color, theme);
      if (background.opacity) {
        result.strokeOpacity = (background.opacity === true ?
          theme.global.opacity.medium : theme.global.opacity[background.opacity]);
      }
    } else {
      result.stroke = colorForName(background, theme);
    }
  }
  return result;
};

export default { backgroundProps };
