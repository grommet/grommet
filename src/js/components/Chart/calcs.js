import { normalizeValues } from './utils';

const thicknessPad = {
  xlarge: 'large',
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
  xsmall: 'xxsmall',
};

export const calcs = (values, options = {}) => {
  const coarseness = options.coarseness || 5;
  const steps = options.steps || [1, 1];
  const calcValues = normalizeValues(values || []);

  let min;
  let max;
  if (options.min !== undefined && options.max !== undefined) {
    ({ min, max } = options);
  } else if (calcValues.length) {
    // Calculate the max and min y values.
    min = calcValues[0].value[1] || 0;
    max = min;
    calcValues.forEach(value => {
      const y = value.value[1];
      min = Math.min(min, y);
      max = Math.max(max, y);
      // handle ranges of values
      if (value.value[2] !== undefined) {
        const y2 = value.value[2];
        min = Math.min(min, y2);
        max = Math.max(max, y2);
      }
    });
    min = options.min !== undefined ? options.min : min;
    max = options.max !== undefined ? options.max : max;

    // Calculate some reasonable y bounds based on the max and min y values.
    // This is so values like 87342.12 don't end up being displayed as the
    // graph axis edge label.
    const delta = max - min;
    const interval = Number.parseFloat((delta / coarseness).toPrecision(1));
    max = max - (max % interval) + interval;
    min -= min % interval;
  }

  const bounds = calcValues.length
    ? [
        [calcValues[0].value[0], calcValues[calcValues.length - 1].value[0]],
        [min, max],
      ]
    : [[], []];
  const dimensions = [bounds[0][1] - bounds[0][0], bounds[1][1] - bounds[1][0]];

  // Calculate x and y axis values across the specfied number of steps.
  const yAxis = [];
  let y = bounds[1][1];
  const yStepInterval = dimensions[1] / steps[1];
  while (y >= bounds[1][0]) {
    yAxis.push(y);
    y -= yStepInterval;
  }

  const xAxis = [];
  let x = bounds[0][0];
  const xStepInterval = dimensions[0] / steps[0];
  while (
    (xStepInterval > 0 && x <= bounds[0][1]) ||
    (xStepInterval < 0 && x >= bounds[0][1])
  ) {
    xAxis.push(x);
    x += xStepInterval;
  }

  let { thickness } = options;
  if (!thickness) {
    // Set bar thickness based on number of values being rendered.
    // Someday, it would be better to include the actual rendered size.
    // These values were emirically determined, trying to balance visibility
    // and overlap across resolutions.
    if (calcValues.length < 5) {
      thickness = 'xlarge';
    } else if (calcValues.length < 11) {
      thickness = 'large';
    } else if (calcValues.length < 21) {
      thickness = 'medium';
    } else if (calcValues.length < 61) {
      thickness = 'small';
    } else if (calcValues.length < 121) {
      thickness = 'xsmall';
    } else {
      thickness = 'hair';
    }
  }

  const pad = thicknessPad[thickness];

  return { axis: [xAxis, yAxis], bounds, dimensions, pad, thickness };
};
