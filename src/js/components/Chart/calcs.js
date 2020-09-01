import { normalizeValues } from './utils';

const thicknessPad = {
  xlarge: 'large',
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
  xsmall: 'xxsmall',
};

export const round = (value, decimals) =>
  Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);

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

export const calcBounds = (values, options = {}) => {
  // coarseness influences the rounding of the bounds, the smaller the
  // number, the more the bounds will be rounded. e.g. 111 -> 110 -> 100
  // Normalize to an array. Backwards compatible has no coarseness for x-axis
  const coarseness = (Array.isArray(options.coarseness) &&
    options.coarseness) ||
    (options.coarseness && [undefined, options.coarseness]) || [undefined, 5];
  // the number of steps is one less than the number of labels
  const steps = options.steps || [1, 1];
  const calcValues = normalizeValues(values || []);

  // min and max values
  let minX;
  let maxX;
  let minY;
  let maxY;
  if (calcValues.length) {
    // Calculate the max and min values.
    calcValues
      .filter(value => value !== undefined)
      .forEach(value => {
        const x = value.value[0];
        if (x !== undefined) {
          minX = minX === undefined ? x : Math.min(minX, x);
          maxX = maxX === undefined ? x : Math.max(maxX, x);
        }
        const y = value.value[1];
        if (y !== undefined) {
          minY = minY === undefined ? y : Math.min(minY, y);
          maxY = maxY === undefined ? y : Math.max(maxY, y);
        }
        // handle ranges of values
        const y2 = value.value[2];
        if (y2 !== undefined) {
          minY = Math.min(minY, y2);
          maxY = Math.max(maxY, y2);
        }
      });

    // when max === min, offset them so we can show something
    if (maxX === minX) {
      if (maxX > 0) minX = maxX - 1;
      else maxX = minX + 1;
    }
    if (maxY === minY) {
      if (maxY > 0) minY = maxY - 1;
      else maxY = minY + 1;
    }

    // Calculate some reasonable bounds based on the max and min values.
    // This is so values like 87342.12 don't end up being displayed as the
    // graph axis labels.
    const [cX, cY] = coarseness;
    if (cX) {
      const deltaX = maxX - minX;
      const intervalX = Number.parseFloat((deltaX / cX).toPrecision(1));
      minX = alignMin(minX, intervalX);
      maxX = alignMax(maxX, intervalX);
    }
    if (cY) {
      const deltaY = maxY - minY;
      const intervalY = Number.parseFloat((deltaY / cY).toPrecision(1));
      minY = alignMin(minY, intervalY);
      maxY = alignMax(maxY, intervalY);
    }

    if (minY < 0 && maxY > 0 && Math.abs(minY) !== Math.abs(maxY)) {
      // Adjust min and max when crossing 0 to ensure 0 will be shown on
      // the Y axis based on the number of steps.

      // const ratio = Math.abs(max) / Math.abs(min);
      let stepInterval = (maxY - minY) / steps[1];
      const minSteps = minY / stepInterval;
      const maxSteps = maxY / stepInterval;
      if (Math.abs(minSteps) < Math.abs(maxSteps)) {
        stepInterval = maxY / Math.floor(maxSteps);
        maxY = stepInterval * Math.floor(maxSteps);
        minY = stepInterval * Math.floor(minSteps);
      } else {
        stepInterval = Math.abs(minY / Math.ceil(minSteps));
        minY = stepInterval * Math.ceil(minSteps);
        maxY = stepInterval * Math.ceil(maxSteps);
      }
    }
  }

  let bounds;
  if (calcValues.length)
    bounds = [
      [minX, maxX],
      [minY, maxY],
    ];
  else bounds = [[], []];
  return bounds;
};

export const calcs = (values = [], options = {}) => {
  // the number of steps is one less than the number of labels
  const steps = options.steps || [1, 1];
  const bounds = options.bounds || calcBounds(values, options);
  if (options.min !== undefined) bounds[1][0] = options.min;
  if (options.max !== undefined) bounds[1][1] = options.max;

  const dimensions = [
    round(bounds[0][1] - bounds[0][0], 2),
    round(bounds[1][1] - bounds[1][0], 2),
  ];

  // Calculate x and y axis values across the specfied number of steps.
  const yAxis = [];
  let y = bounds[1][1];
  // To deal with javascript math limitations, round the step with 4 decimal
  // places and then push the values with 2 decimal places
  const yStepInterval = round(dimensions[1] / steps[1], 4);
  while (round(y, 2) >= bounds[1][0]) {
    yAxis.push(round(y, 2));
    y -= yStepInterval;
  }

  const xAxis = [];
  let x = bounds[0][0];
  const xStepInterval = round(dimensions[0] / steps[0], 4);
  while (round(x, 2) <= bounds[0][1]) {
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

  return { axis: [xAxis, yAxis], bounds, dimensions, pad, thickness };
};
