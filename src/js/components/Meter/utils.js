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

const gapPoints = (centerX, centerY, radius, angle, width) => {
  let startAngle;
  let endAngle;
  let distanceFromCenter;
  if (radius <= 0) {
    // we just need end points of a line through the center
    startAngle = angle - 90;
    endAngle = angle + 90;
    distanceFromCenter = width / 2;
  }
  else {
    const gapAngleRadians = Math.asin(width / (2 * radius));
    const gapAngle = (gapAngleRadians * 180) / Math.PI;
    startAngle = angle - gapAngle;
    endAngle = angle + gapAngle;
    distanceFromCenter = radius;
  }

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
  const start = polarToCartesian(
    centerX,
    centerY,
    distanceFromCenter,
    normalizedEndAngle,
  );
  const end = polarToCartesian(
    centerX,
    centerY,
    distanceFromCenter,
    startAngle,
  );
  const arcSweep = normalizedEndAngle - startAngle <= 180 ? '0' : '1';
  return { start, end, arcSweep };
};

/**
 * Draws a line from a center point to a point on the circumference of
 * a circle with the given radius. The width of the line will be thickness.
 * The line will have a round cap at the center point and a cap at the end
 * point on the circle that matchs the radius.  
 */
export const gapCommands = (
  centerX,
  centerY,
  radius,
  angle,
  width,
  thickness,
) => {
  const outer = gapPoints(centerX, centerY, radius, angle, width);
  const inner = gapPoints(
    centerX,
    centerY,
    thickness > 0 ? radius - thickness : 0,
    angle,
    width,
  );

  const capRadius = thickness > 0
    ? radius - thickness
    : width / 2;

  const d = [
    'M',
    outer.start.x.toFixed(POST_DECIMAL_DIGITS),
    outer.start.y.toFixed(POST_DECIMAL_DIGITS),
    'A',
    radius.toFixed(POST_DECIMAL_DIGITS),
    radius.toFixed(POST_DECIMAL_DIGITS),
    0,
    outer.arcSweep,
    0,
    outer.end.x.toFixed(POST_DECIMAL_DIGITS),
    outer.end.y.toFixed(POST_DECIMAL_DIGITS),
    'L',
    (inner.end.x).toFixed(POST_DECIMAL_DIGITS),
    (inner.end.y).toFixed(POST_DECIMAL_DIGITS),
    'A',
    capRadius.toFixed(POST_DECIMAL_DIGITS),
    capRadius.toFixed(POST_DECIMAL_DIGITS),
    0,
    inner.arcSweep,
    thickness > 0 ? 1 : 0,
    (inner.start.x).toFixed(POST_DECIMAL_DIGITS),
    (inner.start.y).toFixed(POST_DECIMAL_DIGITS),
    'Z', // close the path
  ].join(' ');
  return d;
};
