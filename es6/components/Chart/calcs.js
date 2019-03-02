import { normalizeValues } from './utils';
export var calcs = function calcs(values, options) {
  if (options === void 0) {
    options = {};
  }

  var coarseness = options.coarseness || 5;
  var steps = options.steps || [1, 1];
  var calcValues = normalizeValues(values || []);
  var min;
  var max;

  if (options.min !== undefined && options.max !== undefined) {
    var _options = options;
    min = _options.min;
    max = _options.max;
  } else if (calcValues.length) {
    // Calculate the max and min y values.
    min = calcValues[0].value[1] || 0;
    max = min;
    calcValues.forEach(function (value) {
      var y = value.value[1];
      min = Math.min(min, y);
      max = Math.max(max, y); // handle ranges of values

      if (value.value[2] !== undefined) {
        var y2 = value.value[2];
        min = Math.min(min, y2);
        max = Math.max(max, y2);
      }
    });
    min = options.min !== undefined ? options.min : min;
    max = options.max !== undefined ? options.max : max; // Calculate some reasonable y bounds based on the max and min y values.
    // This is so values like 87342.12 don't end up being displayed as the
    // graph axis edge label.

    var delta = max - min;
    var interval = Number.parseFloat((delta / coarseness).toPrecision(1));
    max = max - max % interval + interval;
    min -= min % interval;
  }

  var bounds = calcValues.length ? [[calcValues[0].value[0], calcValues[calcValues.length - 1].value[0]], [min, max]] : [[], []];
  var dimensions = [bounds[0][1] - bounds[0][0], bounds[1][1] - bounds[1][0]]; // Calculate x and y axis values across the specfied number of steps.

  var yAxis = [];
  var y = bounds[1][1];
  var yStepInterval = dimensions[1] / steps[1];

  while (y >= bounds[1][0]) {
    yAxis.push(y);
    y -= yStepInterval;
  }

  var xAxis = [];
  var x = bounds[0][0];
  var xStepInterval = dimensions[0] / steps[0];

  while (xStepInterval > 0 && x <= bounds[0][1] || xStepInterval < 0 && x >= bounds[0][1]) {
    xAxis.push(x);
    x += xStepInterval;
  } // Set bar thickness based on number of values being rendered.
  // Someday, it would be better to include the actual rendered size.
  // These values were emirically determined, trying to balance visibility
  // and overlap across resolutions.


  var thickness;
  var pad;

  if (calcValues.length < 5) {
    thickness = 'xlarge';
    pad = 'large';
  } else if (calcValues.length < 11) {
    thickness = 'large';
    pad = 'medium';
  } else if (calcValues.length < 21) {
    thickness = 'medium';
    pad = 'small';
  } else if (calcValues.length < 61) {
    thickness = 'small';
    pad = 'xsmall';
  } else if (calcValues.length < 121) {
    thickness = 'xsmall';
    pad = 'xxsmall';
  } else {
    thickness = 'hair';
  }

  return {
    axis: [xAxis, yAxis],
    bounds: bounds,
    dimensions: dimensions,
    pad: pad,
    thickness: thickness
  };
};