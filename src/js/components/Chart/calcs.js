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

export const calcs = (values, options = {}) => {
  // coarseness influences the rounding of the bounds, the smaller the
  // number, the more the bounds will be rounded. e.g. 111 -> 110 -> 100
  const coarseness = options.coarseness || 5;
  // the number of steps is one less than the number of labels
  const steps = options.steps || [1, 1];
  const calcValues = normalizeValues(values || []);

  // min and max y values
  let min;
  let max;
  if (calcValues.length) {
    // Calculate the max and min y values.
    calcValues
      .filter(value => value !== undefined)
      .forEach(value => {
        const y = value.value[1];
        if (y !== undefined) {
          min = min === undefined ? y : Math.min(min, y);
          max = max === undefined ? y : Math.max(max, y);
        }
        // handle ranges of values
        const y2 = value.value[2];
        if (y2 !== undefined) {
          min = Math.min(min, y2);
          max = Math.max(max, y2);
        }
      });

    // when max === min, offset them so we can show something
    if (max === min) {
      if (max > 0) min = max - 1;
      else max = min + 1;
    }

    // Calculate some reasonable y bounds based on the max and min y values.
    // This is so values like 87342.12 don't end up being displayed as the
    // graph axis edge label.
    const delta = max - min;
    const interval = Number.parseFloat((delta / coarseness).toPrecision(1));
    max = max - (max % interval) + interval;
    min -= min % interval;

    if (min < 0 && max > 0 && Math.abs(min) !== Math.abs(max)) {
      // Adjust min and max when crossing 0 to ensure 0 will be shown on
      // the Y axis based on the number of steps.

      // const ratio = Math.abs(max) / Math.abs(min);
      let stepInterval = (max - min) / steps[1];
      const minSteps = min / stepInterval;
      const maxSteps = max / stepInterval;
      if (Math.abs(minSteps) < Math.abs(maxSteps)) {
        stepInterval = max / Math.floor(maxSteps);
        max = stepInterval * Math.floor(maxSteps);
        min = stepInterval * Math.floor(minSteps);
      } else {
        stepInterval = Math.abs(min / Math.ceil(minSteps));
        min = stepInterval * Math.ceil(minSteps);
        max = stepInterval * Math.ceil(maxSteps);
      }
    }
  }
  if (options.min !== undefined) ({ min } = options);
  if (options.max !== undefined) ({ max } = options);

  let bounds;
  if (calcValues.length > 1)
    bounds = [
      [calcValues[0].value[0], calcValues[calcValues.length - 1].value[0]],
      [min, max],
    ];
  else if (calcValues.length === 1)
    // when we only have one value, at least git some x bounds
    bounds = [
      [calcValues[0].value[0], calcValues[0].value[0] + 1],
      [min, max],
    ];
  else bounds = [[], []];
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
