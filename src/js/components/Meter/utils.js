import { normalizeColor, polarToCartesian } from '../../utils';

const POST_DECIMAL_DIGITS = 10;

export const strokeProps = (color, theme) => {
  const result = {};
  if (color) {
    if (typeof color === 'object') {
      result.stroke = normalizeColor(color.color, theme);
      if (color.opacity) {
        result.strokeOpacity = `${
          color.opacity === true
            ? theme.global.opacity.medium
            : theme.global.opacity[color.opacity] || color.opacity
        }`;
      }
    } else {
      result.stroke = normalizeColor(color, theme);
    }
  }
  return result;
};

export const fillProps = (color, theme) => {
  const result = {};
  if (color) {
    if (typeof color === 'object') {
      result.fill = normalizeColor(color.color, theme);
      // if (color.opacity) {
      //   result.strokeOpacity = `${
      //     color.opacity === true
      //       ? theme.global.opacity.medium
      //       : theme.global.opacity[color.opacity] || color.opacity
      //   }`;
      // }
    } else {
      result.fill = normalizeColor(color, theme);
    }
  }
  return result;
};

const neutralExp = /^neutral-\d+/;

export const defaultColor = (index, theme, valuesLength) => {
  if (index === valuesLength - 1 && theme.meter.color) {
    return theme.meter.color;
  }
  // We want the last value to have the first color
  const colorIndex = valuesLength - index - 1;
  if (theme.meter && theme.meter.colors) {
    const colors =
      theme.meter.colors[theme.dark ? 'dark' : 'light'] || theme.meter.colors;
    return colors[colorIndex % colors.length];
  }
  const colors = Object.keys(theme.global.colors).filter(n =>
    n.match(/^graph-[0-9]$/),
  );
  if (colors.length > 0) {
    return colors[colorIndex % colors.length];
  }
  // Deprecate using "neutral-*" color names. Remove eventually.
  const neutralColors = Object.keys(theme.global.colors).filter(k =>
    neutralExp.test(k),
  );
  return neutralColors[colorIndex % neutralColors.length];
};

/**
 * Draws a line from a center point to a point on the circumference of
 * a circle with the given radius. The width of the line will be thickness.
 * The line will have a round cap at the center point and a cap at the end
 * point on the circle that matchs the radius.  
 */
export const gapCommands = (centerX, centerY, radius, angle, thickness) => {
  const gapAngleRadians = Math.asin(thickness / (2 * radius));
  const gapAngle = (gapAngleRadians * 180) / Math.PI;
  const startAngle = angle - gapAngle;
  const endAngle = angle + gapAngle;
  // handle that we can't draw a complete circle
  let normalizedEndAngle = endAngle;
  /* 
   added endAngle - startAngle >= 360 
   for SemiCircle the endAngle will never be greater then startAngle 
   since it starts with a startAngle of 270.
  */
  if (endAngle > startAngle && endAngle - startAngle >= 360) {
    normalizedEndAngle = startAngle + 359.99;
  }
  const start = polarToCartesian(centerX, centerY, radius, normalizedEndAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  const trans = { x: end.x - start.x, y: end.y - start.y };
  const capRadius = Math.sqrt(trans.x * trans.x + trans.y * trans.y)/2;
  const arcSweep = normalizedEndAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x.toFixed(POST_DECIMAL_DIGITS),
    start.y.toFixed(POST_DECIMAL_DIGITS),
    'A',
    radius.toFixed(POST_DECIMAL_DIGITS),
    radius.toFixed(POST_DECIMAL_DIGITS),
    0,
    arcSweep,
    0,
    end.x.toFixed(POST_DECIMAL_DIGITS),
    end.y.toFixed(POST_DECIMAL_DIGITS),
    'L',
    (centerX + trans.x / 2).toFixed(POST_DECIMAL_DIGITS),
    (centerY + trans.y / 2).toFixed(POST_DECIMAL_DIGITS),
    'A',
    capRadius.toFixed(POST_DECIMAL_DIGITS),
    capRadius.toFixed(POST_DECIMAL_DIGITS),
    0,
    arcSweep,
    0,
    (centerX - trans.x / 2).toFixed(POST_DECIMAL_DIGITS),
    (centerY - trans.y / 2).toFixed(POST_DECIMAL_DIGITS),
    'Z', // close the path
  ].join(' ');
  return d;
};