import { normalizeValues } from './utils';

export const calcs = (values, options = {}) => {
  const coarseness = options.coarseness || 5;
  const steps = options.steps || [1, 1];
  const calcValues = normalizeValues(values);

  // Calculate the max and min y values.
  let min = calcValues[0].value[1];
  let max = min;
  calcValues.forEach((value) => {
    const y = value.value[1];
    min = Math.min(min, y);
    max = Math.max(max, y);
  });

  // Calculate some reasonable y bounds based on the max and min y values.
  // This is so values like 87342.12 don't end up being displayed as the
  // graph axis edge label.
  const delta = max - min;
  const interval = Number.parseFloat((delta / coarseness).toPrecision(1));
  max = (max - (max % interval)) + interval;
  min -= (min % interval);
  const bounds =
    [[calcValues[0].value[0], calcValues[calcValues.length - 1].value[0]], [min, max]];
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
  while (x <= bounds[0][1]) {
    xAxis.push(x);
    x += xStepInterval;
  }

  return ({ axis: [xAxis, yAxis], bounds, dimensions });
};
