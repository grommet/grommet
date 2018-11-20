"use strict";

exports.__esModule = true;
exports.calcs = void 0;

var _utils = require("./utils");

var calcs = function calcs(values, options) {
  if (options === void 0) {
    options = {};
  }

  var coarseness = options.coarseness || 5;
  var steps = options.steps || [1, 1];
  var calcValues = (0, _utils.normalizeValues)(values); // Calculate the max and min y values.

  var min = calcValues[0].value[1];
  var max = min;
  calcValues.forEach(function (value) {
    var y = value.value[1];
    min = Math.min(min, y);
    max = Math.max(max, y);
  }); // Calculate some reasonable y bounds based on the max and min y values.
  // This is so values like 87342.12 don't end up being displayed as the
  // graph axis edge label.

  var delta = max - min;
  var interval = Number.parseFloat((delta / coarseness).toPrecision(1));
  max = max - max % interval + interval;
  min -= min % interval;
  var bounds = [[calcValues[0].value[0], calcValues[calcValues.length - 1].value[0]], [min, max]];
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

  while (x <= bounds[0][1]) {
    xAxis.push(x);
    x += xStepInterval;
  }

  return {
    axis: [xAxis, yAxis],
    bounds: bounds,
    dimensions: dimensions
  };
};

exports.calcs = calcs;