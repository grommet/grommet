import { calcMinMax, normalizeValues } from './utils';

const thicknessPad = {
  xlarge: 'large',
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
  xsmall: 'xxsmall',
};

export const round = (value, decimals) =>
  Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);

// Normalize coarseness to an object.
// Backwards compatible has no coarseness for x-axis.
const normalizeCoarseness = (coarseness, direction) => {
  let result;
  if (Array.isArray(coarseness))
    result = { x: coarseness[0], y: coarseness[1] };
  else if (typeof coarseness === 'object') result = coarseness;
  else if (coarseness) result = { x: undefined, y: coarseness };
  else
    result =
      direction === 'horizontal'
        ? { x: 5, y: undefined }
        : { x: undefined, y: 5 };
  return result;
};

const normalizeSteps = (steps) => {
  let result;
  if (Array.isArray(steps)) result = { x: steps[0], y: steps[1] };
  else if (typeof steps === 'object') result = steps;
  else result = { x: 1, y: 1 };
  return result;
};

const alignMax = (value, interval) => {
  if (value > 0) return value - (value % interval) + interval;
  if (value < 0) return value + (value % interval);
  return value;
};

const alignMin = (value, interval) => {
  if (value > 0) return value - (value % interval);
  if (value < 0) return value - (value % interval) - interval;
  return value;
};

const adjustToShowZero = (minArg, maxArg, steps) => {
  let min = minArg;
  let max = maxArg;
  if (min < 0 && max > 0 && Math.abs(min) !== Math.abs(max)) {
    // Adjust min and max when crossing 0 to ensure 0 will be shown on
    // the axis based on the number of steps.
    if (steps === 1) {
      const largest = Math.max(Math.abs(min), Math.abs(max));
      min = -largest;
      max = largest;
    } else {
      let stepInterval = (max - min) / steps;
      const minSteps = min / stepInterval;
      const maxSteps = max / stepInterval;
      if (Math.abs(minSteps) < Math.abs(maxSteps)) {
        // more above than below
        stepInterval = max / Math.floor(maxSteps);
        max = stepInterval * Math.floor(maxSteps);
        min = stepInterval * Math.floor(minSteps);
      } else {
        // more below than above
        stepInterval = Math.abs(min / Math.ceil(minSteps));
        min = stepInterval * Math.ceil(minSteps);
        max = stepInterval * Math.ceil(maxSteps);
      }
    }
  }
  return [min, max];
};

export const calcBounds = (valuesArg, options = {}) => {
  // coarseness influences the rounding of the bounds, the smaller the
  // number, the more the bounds will be rounded. e.g. 111 -> 110 -> 100.
  const { x: coarseX, y: coarseY } = normalizeCoarseness(
    options.coarseness,
    options.direction,
  );

  // the number of steps is one less than the number of labels
  const { x: stepsX, y: stepsY } = normalizeSteps(options.steps);

  const values = normalizeValues(valuesArg || []);

  let result;
  if (values.length) {
    // min and max values
    let {
      x: { min: minX, max: maxX },
      y: { min: minY, max: maxY },
    } = calcMinMax(values, options.direction);

    // Calculate some reasonable bounds based on the max and min values.
    // This is so values like 87342.12 don't end up being displayed as the
    // graph axis labels.
    if (coarseX) {
      const deltaX = maxX - minX;
      const intervalX = Number.parseFloat((deltaX / coarseX).toPrecision(1));
      minX = alignMin(minX, intervalX);
      maxX = alignMax(maxX, intervalX);
    }
    if (coarseY) {
      const deltaY = maxY - minY;
      const intervalY = Number.parseFloat((deltaY / coarseY).toPrecision(1));
      minY = alignMin(minY, intervalY);
      maxY = alignMax(maxY, intervalY);
    }

    if (options.direction === 'horizontal')
      [minX, maxX] = adjustToShowZero(minX, maxX, stepsX);
    else [minY, maxY] = adjustToShowZero(minY, maxY, stepsY);

    // if options.direction is present, the results are delivered in { x, y }
    // object structure. If options.direction is not present, the results are
    // delivered in [x, y] array structure, for backwards compatibility
    result = options.direction
      ? { x: { min: minX, max: maxX }, y: { min: minY, max: maxY } }
      : [
          [minX, maxX],
          [minY, maxY],
        ];
  } else {
    result = options.direction ? { x: {}, y: {} } : [[], []];
  }

  return result;
};

// if options.direction is present, the results are delivered in { x, y }
// object structure. If options.direction is not present, the results are
// delivered in [x, y] array structure, for backwards compatibility
export const calcs = (values = [], options = {}) => {
  const horizontal = options.direction === 'horizontal';

  // the number of steps is one less than the number of labels
  const { x: stepsX, y: stepsY } = normalizeSteps(options.steps);

  // bounds is { x: { min, max }, y: { min, max } } when options.direction is
  // present and [[min, max], [min, max]] if not, for backwards compatibility
  const bounds = options.bounds || calcBounds(values, options);

  if (options.min !== undefined) {
    if (options.direction) {
      if (horizontal) bounds.x.min = options.min;
      else bounds.y.min = options.min;
    } else bounds[1][0] = options.min;
  }
  if (options.max !== undefined) {
    if (options.direction) {
      if (horizontal) bounds.y.max = options.max;
      else bounds.x.max = options.max;
    } else bounds[1][1] = options.max;
  }

  const {
    x: { min: minX, max: maxX },
    y: { min: minY, max: maxY },
  } = options.direction
    ? bounds
    : {
        x: { min: bounds[0][0], max: bounds[0][1] },
        y: { min: bounds[1][0], max: bounds[1][1] },
      };

  const width = round(maxX - minX, 2);
  const height = round(maxY - minY, 2);
  const dimensions = options.direction ? { width, height } : [width, height];

  // Calculate x and y axis values across the specfied number of steps.
  const yAxis = [];
  let y = maxY;
  // To deal with javascript math limitations, round the step with 4 decimal
  // places and then push the values with 2 decimal places
  const yStepInterval = round(height / stepsY, 4);
  while (round(y, 2) >= minY) {
    yAxis.push(round(y, 2));
    y -= yStepInterval;
  }
  if (horizontal) yAxis.reverse();

  const xAxis = [];
  let x = minX;
  const xStepInterval = round(width / stepsX, 4);
  while (round(x, 2) <= maxX) {
    xAxis.push(round(x, 2));
    x += xStepInterval;
  }

  let { thickness } = options;
  if (!thickness) {
    // Set bar thickness based on number of values being rendered.
    // Someday, it would be better to include the actual rendered size.
    // These values were emirically determined, trying to balance visibility
    // and overlap across resolutions.
    if (values.length < 5) {
      thickness = 'xlarge';
    } else if (values.length < 11) {
      thickness = 'large';
    } else if (values.length < 21) {
      thickness = 'medium';
    } else if (values.length < 61) {
      thickness = 'small';
    } else if (values.length < 121) {
      thickness = 'xsmall';
    } else {
      thickness = 'hair';
    }
  }

  const pad = thicknessPad[thickness];

  return {
    axis: options.direction ? { x: xAxis, y: yAxis } : [xAxis, yAxis],
    bounds,
    dimensions,
    pad,
    thickness,
  };
};
