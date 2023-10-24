import { calcMinMax, normalizeValues } from './utils';
var thicknessPad = {
  xlarge: 'large',
  large: 'medium',
  medium: 'small',
  small: 'xsmall',
  xsmall: 'xxsmall'
};
export var round = function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

// Normalize coarseness to an object.
// Backwards compatible has no coarseness for x-axis.
var normalizeCoarseness = function normalizeCoarseness(coarseness, direction) {
  var result;
  if (Array.isArray(coarseness)) result = {
    x: coarseness[0],
    y: coarseness[1]
  };else if (typeof coarseness === 'object') result = coarseness;else if (coarseness) result = {
    x: undefined,
    y: coarseness
  };else result = direction === 'horizontal' ? {
    x: 5,
    y: undefined
  } : {
    x: undefined,
    y: 5
  };
  return result;
};
var normalizeSteps = function normalizeSteps(steps) {
  var result;
  if (Array.isArray(steps)) result = {
    x: steps[0],
    y: steps[1]
  };else if (typeof steps === 'object') result = steps;else result = {
    x: 1,
    y: 1
  };
  return result;
};
var alignMax = function alignMax(value, interval) {
  if (value > 0) return value - value % interval + interval;
  if (value < 0) return value + value % interval;
  return value;
};
var alignMin = function alignMin(value, interval) {
  if (value > 0) return value - value % interval;
  if (value < 0) return value - value % interval - interval;
  return value;
};
var adjustToShowZero = function adjustToShowZero(minArg, maxArg, steps) {
  var min = minArg;
  var max = maxArg;
  if (min < 0 && max > 0 && Math.abs(min) !== Math.abs(max)) {
    // Adjust min and max when crossing 0 to ensure 0 will be shown on
    // the axis based on the number of steps.
    if (steps === 1) {
      var largest = Math.max(Math.abs(min), Math.abs(max));
      min = -largest;
      max = largest;
    } else {
      var stepInterval = (max - min) / steps;
      var minSteps = min / stepInterval;
      var maxSteps = max / stepInterval;
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
export var calcBounds = function calcBounds(valuesArg, options) {
  if (options === void 0) {
    options = {};
  }
  // coarseness influences the rounding of the bounds, the smaller the
  // number, the more the bounds will be rounded. e.g. 111 -> 110 -> 100.
  var _normalizeCoarseness = normalizeCoarseness(options.coarseness, options.direction),
    coarseX = _normalizeCoarseness.x,
    coarseY = _normalizeCoarseness.y;

  // the number of steps is one less than the number of labels
  var _normalizeSteps = normalizeSteps(options.steps),
    stepsX = _normalizeSteps.x,
    stepsY = _normalizeSteps.y;
  var values = normalizeValues(valuesArg || []);
  var result;
  if (values.length) {
    // min and max values
    var _calcMinMax = calcMinMax(values, options.direction),
      _calcMinMax$x = _calcMinMax.x,
      minX = _calcMinMax$x.min,
      maxX = _calcMinMax$x.max,
      _calcMinMax$y = _calcMinMax.y,
      minY = _calcMinMax$y.min,
      maxY = _calcMinMax$y.max;

    // Calculate some reasonable bounds based on the max and min values.
    // This is so values like 87342.12 don't end up being displayed as the
    // graph axis labels.
    if (coarseX) {
      var deltaX = maxX - minX;
      var intervalX = Number.parseFloat((deltaX / coarseX).toPrecision(1));
      minX = alignMin(minX, intervalX);
      maxX = alignMax(maxX, intervalX);
    }
    if (coarseY) {
      var deltaY = maxY - minY;
      var intervalY = Number.parseFloat((deltaY / coarseY).toPrecision(1));
      minY = alignMin(minY, intervalY);
      maxY = alignMax(maxY, intervalY);
    }
    if (options.direction === 'horizontal') {
      var _adjustToShowZero = adjustToShowZero(minX, maxX, stepsX);
      minX = _adjustToShowZero[0];
      maxX = _adjustToShowZero[1];
    } else {
      var _adjustToShowZero2 = adjustToShowZero(minY, maxY, stepsY);
      minY = _adjustToShowZero2[0];
      maxY = _adjustToShowZero2[1];
    }

    // if options.direction is present, the results are delivered in { x, y }
    // object structure. If options.direction is not present, the results are
    // delivered in [x, y] array structure, for backwards compatibility
    result = options.direction ? {
      x: {
        min: minX,
        max: maxX
      },
      y: {
        min: minY,
        max: maxY
      }
    } : [[minX, maxX], [minY, maxY]];
  } else {
    result = options.direction ? {
      x: {},
      y: {}
    } : [[], []];
  }
  return result;
};

// if options.direction is present, the results are delivered in { x, y }
// object structure. If options.direction is not present, the results are
// delivered in [x, y] array structure, for backwards compatibility
export var calcs = function calcs(values, options) {
  if (values === void 0) {
    values = [];
  }
  if (options === void 0) {
    options = {};
  }
  var horizontal = options.direction === 'horizontal';

  // the number of steps is one less than the number of labels
  var _normalizeSteps2 = normalizeSteps(options.steps),
    stepsX = _normalizeSteps2.x,
    stepsY = _normalizeSteps2.y;

  // bounds is { x: { min, max }, y: { min, max } } when options.direction is
  // present and [[min, max], [min, max]] if not, for backwards compatibility
  var bounds = options.bounds || calcBounds(values, options);
  if (options.min !== undefined) {
    if (options.direction) {
      if (horizontal) bounds.x.min = options.min;else bounds.y.min = options.min;
    } else bounds[1][0] = options.min;
  }
  if (options.max !== undefined) {
    if (options.direction) {
      if (horizontal) bounds.y.max = options.max;else bounds.x.max = options.max;
    } else bounds[1][1] = options.max;
  }
  var _ref = options.direction ? bounds : {
      x: {
        min: bounds[0][0],
        max: bounds[0][1]
      },
      y: {
        min: bounds[1][0],
        max: bounds[1][1]
      }
    },
    _ref$x = _ref.x,
    minX = _ref$x.min,
    maxX = _ref$x.max,
    _ref$y = _ref.y,
    minY = _ref$y.min,
    maxY = _ref$y.max;
  var width = round(maxX - minX, 2);
  var height = round(maxY - minY, 2);
  var dimensions = options.direction ? {
    width: width,
    height: height
  } : [width, height];

  // Calculate x and y axis values across the specfied number of steps.
  var yAxis = [];
  var y = maxY;
  // To deal with javascript math limitations, round the step with 4 decimal
  // places and then push the values with 2 decimal places
  var yStepInterval = round(height / stepsY, 4);
  while (round(y, 2) >= minY) {
    yAxis.push(round(y, 2));
    y -= yStepInterval;
  }
  if (horizontal) yAxis.reverse();
  var xAxis = [];
  var x = minX;
  var xStepInterval = round(width / stepsX, 4);
  while (round(x, 2) <= maxX) {
    xAxis.push(round(x, 2));
    x += xStepInterval;
  }
  var _options = options,
    thickness = _options.thickness;
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
  var pad = thicknessPad[thickness];
  return {
    axis: options.direction ? {
      x: xAxis,
      y: yAxis
    } : [xAxis, yAxis],
    bounds: bounds,
    dimensions: dimensions,
    pad: pad,
    thickness: thickness
  };
};