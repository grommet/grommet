const POST_DECIMAL_DIGITS = 10;

export const baseUnit = 24;

export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const intersection = (line1Point1, line1Point2, line2Point1, line2Point2) => {
  const { x: x1, y: y1 } = line1Point1;
  const { x: x2, y: y2 } = line1Point2;
  const { x: x3, y: y3 } = line2Point1;
  const { x: x4, y: y4 } = line2Point2;

  // Calculate the denominator
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  // Check if lines are parallel (denominator is 0)
  if (Math.abs(denominator) < 1e-10) {
    return null; // Lines are parallel or coincident
  }

  // Calculate the intersection point
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

  // Calculate intersection coordinates
  const intersectionX = x1 + t * (x2 - x1);
  const intersectionY = y1 + t * (y2 - y1);

  return {
    x: intersectionX,
    y: intersectionY,
    // Optional: check if intersection is within line segments
    withinSegment1: t >= 0 && t <= 1,
    withinSegment2: u >= 0 && u <= 1,
  };
};

export const lineCommands = (centerX, centerY, radius, angle) => {
  const start = polarToCartesian(centerX, centerY, radius, angle);

  const d = [
    'M',
    centerX.toFixed(POST_DECIMAL_DIGITS),
    centerY.toFixed(POST_DECIMAL_DIGITS),
    'L',
    start.x.toFixed(POST_DECIMAL_DIGITS),
    start.y.toFixed(POST_DECIMAL_DIGITS),
  ].join(' ');
  return d;
};

export const arcCommands = (centerX, centerY, radius, startAngle, endAngle) => {
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
  ].join(' ');
  return d;
};

export const calcAngle = (radius, angle, midAngle, gap) => {
  const gapAngleRadians = Math.asin(Math.abs(gap) / radius);
  const gapAngle = (gapAngleRadians * 180) / Math.PI;
  return gap > 0
    ? Math.min(angle + gapAngle, midAngle)
    : Math.max(angle - gapAngle, midAngle);
};

const gapPoints = (
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  angle,
  midAngle,
  gap,
) => {
  const outerAngle = calcAngle(outerRadius, angle, midAngle, gap);
  const outer = polarToCartesian(centerX, centerY, outerRadius, outerAngle);

  let inner;
  if (innerRadius > 0) {
    const innerAngle = calcAngle(innerRadius, angle, midAngle, gap);
    inner = polarToCartesian(centerX, centerY, innerRadius, innerAngle);
  } else {
    inner = polarToCartesian(
      centerX,
      centerY,
      Math.abs(gap),
      gap < 0 ? angle - 90 : angle + 90,
    );
  }

  return { outer, inner };
};

export const wedgeCommands = (
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  startAngle,
  endAngle,
  startGap,
  endGap,
  startRound,
  endRound,
  startRoundDirection = 0,
) => {
  // handle that we can't draw a complete circle
  let normalizedEndAngle = endAngle;
  /* 
   added endAngle - startAngle >= 360 
   for SemiCircle the endAngle will never be greater then startAngle 
   since it starts with a startAngle of 270.
 */
  if (endAngle > startAngle && endAngle - startAngle >= 359.99) {
    normalizedEndAngle = startAngle + 359.99;
  }

  // if we're rounded we need to ajust the start points to
  // account for a bigger cap radius

  // add a little bit extra to start to allow for larger rounded inset cap
  // The extra needed can be calculated by the Pythagorean theorem
  const thickness = outerRadius - innerRadius;
  const extraGap = startRound
    ? Math.sqrt((thickness / 2 + startGap / 4) ** 2 - (thickness / 2) ** 2)
    : 0;

  // define the angle at the center of the wedge. We can't let the gap
  // go past this angle.
  const midAngle = (startAngle + normalizedEndAngle) / 2;

  const start = gapPoints(
    centerX,
    centerY,
    outerRadius,
    innerRadius,
    startAngle,
    midAngle,
    startGap + extraGap,
    startRound,
  );
  const end = gapPoints(
    centerX,
    centerY,
    outerRadius,
    innerRadius,
    normalizedEndAngle,
    midAngle,
    endGap,
    endRound,
  );

  const largeAngle = normalizedEndAngle - startAngle > 180;

  const arcSweep = largeAngle ? '1' : '0';
  let innerCapRadius = innerRadius;
  let innerArcSweep = arcSweep;
  let middle;

  if (innerRadius <= 0) {
    // we're doing a pie wedge
    innerArcSweep = arcSweep === '0' ? '1' : '0';
    if (largeAngle) {
      // for a large pie wedge it has an inner corner rather
      // than a point. We need to round the inner corner
      innerCapRadius = startGap || endGap || 0;
    } else {
      // for a small pie wedge we'll make a point in the center
      middle = intersection(start.outer, start.inner, end.outer, end.inner);
    }
  }
  const capRadius = (outerRadius - innerRadius) / 2;
  const startCapRadius =
    capRadius + (startRoundDirection === 0 ? startGap / 2 : 0);

  const startPoint = middle || start.inner;
  const endPoint = middle || end.inner;
  const startCap = startRound
    ? [
        'A',
        startCapRadius.toFixed(POST_DECIMAL_DIGITS),
        startCapRadius.toFixed(POST_DECIMAL_DIGITS),
        0,
        0,
        startRoundDirection,
        start.outer.x.toFixed(POST_DECIMAL_DIGITS),
        start.outer.y.toFixed(POST_DECIMAL_DIGITS),
      ]
    : [
        'L',
        start.outer.x.toFixed(POST_DECIMAL_DIGITS),
        start.outer.y.toFixed(POST_DECIMAL_DIGITS),
      ];
  const endCap = endRound
    ? [
        'A',
        capRadius.toFixed(POST_DECIMAL_DIGITS),
        capRadius.toFixed(POST_DECIMAL_DIGITS),
        0,
        0,
        1,
        endPoint.x.toFixed(POST_DECIMAL_DIGITS),
        endPoint.y.toFixed(POST_DECIMAL_DIGITS),
      ]
    : [
        'L',
        endPoint.x.toFixed(POST_DECIMAL_DIGITS),
        endPoint.y.toFixed(POST_DECIMAL_DIGITS),
      ];
  const d = [
    'M',
    startPoint.x.toFixed(POST_DECIMAL_DIGITS),
    startPoint.y.toFixed(POST_DECIMAL_DIGITS),
    ...startCap,
    'A',
    outerRadius.toFixed(POST_DECIMAL_DIGITS),
    outerRadius.toFixed(POST_DECIMAL_DIGITS),
    0,
    arcSweep,
    1,
    end.outer.x.toFixed(POST_DECIMAL_DIGITS),
    end.outer.y.toFixed(POST_DECIMAL_DIGITS),
    ...endCap,
  ];
  if (innerRadius > 0 || largeAngle) {
    // for a donut or a large pie wedge, draw the inner arc
    d.push(
      'A',
      innerCapRadius.toFixed(POST_DECIMAL_DIGITS),
      innerCapRadius.toFixed(POST_DECIMAL_DIGITS),
      0,
      innerArcSweep,
      0,
      start.inner.x.toFixed(POST_DECIMAL_DIGITS),
      start.inner.y.toFixed(POST_DECIMAL_DIGITS),
      'Z', // close the path
    );
  }

  return d.join(' ');
};

/* TranslatedEngAngle will now take the value of the
startAngle + anglePer * value and mod by 360. This was added
to take account the startAngle not being 0. So no matter the
value it will be % 360 to get the correct angle. 
*/
export const translateEndAngle = (startAngle, anglePer, value) =>
  Math.max(0, startAngle + anglePer * value) % 360;
